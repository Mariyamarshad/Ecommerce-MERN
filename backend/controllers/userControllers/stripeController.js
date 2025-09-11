const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../../models/Orders");
const sendEmail = require("../../Utils/email");

const PKR_TO_USD = 0.0036;

exports.createCheckoutSession = async (req, res) => {
  try {
    const { items, shippingInfo } = req.body;
    const userId = req.user?.id;

    if (!items || items.length === 0) {
      return res.status(400).json({
        error: "No items in cart",
        details: "The request did not include any items to checkout.",
      });
    }

    const mappedItems = items
      .filter((i) => i.name)
      .map((i) => ({
        productId: i._id || null,
        quantity: i.quantity,
        price: i.price,
        name: i.name,
      }));

    if (mappedItems.length === 0) {
      return res.status(400).json({
        error: "No valid products in cart",
        details: "Products must include name, price, and quantity.",
      });
    }

    const totalAmountPKR =
      mappedItems.reduce((sum, i) => sum + i.price * i.quantity, 0) + 200;

    const order = await Order.create({
      userId,
      items: mappedItems,
      shippingInfo,
      total: totalAmountPKR,
      status: "pending",
    });

    const line_items = mappedItems.map((item) => {
      const priceUSD = item.price * PKR_TO_USD;
      return {
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: Math.round(priceUSD * 100),
        },
        quantity: item.quantity,
      };
    });

    const shippingUSD = 200 * PKR_TO_USD;
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Shipping" },
        unit_amount: Math.round(shippingUSD * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: req.user?.email || "test@example.com",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId?.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);

    if (error.raw) {
      console.error("Stripe error details:", error.raw);
    }

    res.status(error.statusCode || 500).json({
      error: error.message || "Failed to create checkout session",
      type: error.type || "server_error",
      details: error.raw || null,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

exports.webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const orderId = session.metadata.orderId;
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(400).send("Order not found");
      }

      order.status = "paid";
      order.paymentIntentId = session.payment_intent;
      await order.save();

      try {
        const userEmail = session.customer_email || "customer@example.com";
        console.log(" Sending confirmation email to:", userEmail);

        const itemsHtml = order.items
          .map(
            (item) =>
              `<li>${item.name} (x${item.quantity}) - ${
                item.price * item.quantity
              } PKR</li>`
          )
          .join("");

        const shippingHtml = `
  <p><strong>Shipping Info:</strong></p>
  <p>${order.shippingInfo.address}, ${order.shippingInfo.city}</p>
  <p>${order.shippingInfo.phone}</p>
`;

        await sendEmail(
          userEmail,
          userEmail,
          "Order Confirmation",
          "Your order has been placed successfully!",
          `
    <h1>Thank you for your order! </h1>
    <p>Your order <strong>#${order._id}</strong> has been confirmed.</p>
    <h3>Order Details:</h3>
    <ul>${itemsHtml}</ul>
    <p><strong>Total:</strong> ${order.total} PKR</p>
    ${shippingHtml}
  `
        );

        console.log(` Confirmation email sent to ${userEmail}`);
      } catch (emailErr) {
        console.error(" Failed to send confirmation email:", emailErr);
      }
    } catch (err) {
      console.error(" Failed to update order after payment:", err);
    }
  } else {
    console.log("Ignored event type:", event.type);
  }

  res.json({ received: true });
};

 exports.refundOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    if (!order.paymentIntentId) {
      return res.status(400).json({ error: "No payment intent found for this order" });
    }

    const refund = await stripe.refunds.create({
      payment_intent: order.paymentIntentId,
    });

   
    await order.save();

    res.json({ message: "Order refunded successfully", refund });
  } catch (err) {
    console.error("Refund failed:", err);
    res.status(500).json({ error: err.message });
  }
};