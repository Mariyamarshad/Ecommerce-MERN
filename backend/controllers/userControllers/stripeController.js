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
      return res.status(400).json({ error: "No items in cart" });
    }

    const mappedItems = items
      .filter(i => i.name)
      .map(i => ({
        productId: i._id || null,
        quantity: i.quantity,
        price: i.price,
        name: i.name,
      }));

    if (mappedItems.length === 0) {
      return res.status(400).json({ error: "No valid products in cart" });
    }

    const totalAmountPKR = mappedItems.reduce((sum, i) => sum + i.price * i.quantity, 0) + 200;

    const line_items = mappedItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * PKR_TO_USD * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Shipping" },
        unit_amount: Math.round(200 * PKR_TO_USD * 100),
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
        userId: userId?.toString(),
        cart: JSON.stringify(mappedItems),
        shipping: JSON.stringify(shippingInfo),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    res.status(error.statusCode || 500).json({ error: error.message });
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

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const items = JSON.parse(session.metadata.cart || "[]");
      const shippingInfo = JSON.parse(session.metadata.shipping || "{}");

      const order = await Order.create({
        userId,
        items,
        shippingInfo,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0) + 200,
        status: "paid",
        paymentIntentId: session.payment_intent,
      });

      const userEmail = session.customer_email || "customer@example.com";

      const itemsHtml = order.items
        .map(i => `<li>${i.name} (x${i.quantity}) - ${i.price * i.quantity} PKR</li>`)
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
          <h1>Thank you for your order!</h1>
          <p>Your order <strong>#${order._id}</strong> has been confirmed.</p>
          <h3>Order Details:</h3>
          <ul>${itemsHtml}</ul>
          <p><strong>Total:</strong> ${order.total} PKR</p>
          ${shippingHtml}
        `
      );

      console.log(`Order created and email sent for order ${order._id}`);
    }

    if (event.type === "charge.refunded" || event.type === "refund.updated") {
      const charge = event.data.object;
      const paymentIntentId = charge.payment_intent;
      const order = await Order.findOne({ paymentIntentId });

      if (order && order.status !== "failed") {
        order.status = "failed";
        await order.save();

        const userEmail = order.userEmail || "customer@example.com";
        await sendEmail(
          userEmail,
          userEmail,
          "Order Refunded",
          "Your order has been refunded",
          `
            <h1>Order Cancelled & Refunded</h1>
            <p>Your order <strong>#${order._id}</strong> has been refunded successfully.</p>
          `
        );

        console.log(`Refund email sent to ${userEmail} for order ${order._id}`);
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    res.status(500).send("Webhook error");
  }
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

    order.status = "failed"; 
    await order.save();

    const userEmail = req.user?.email || "customer@example.com";
    await sendEmail(
      userEmail,
      userEmail,
      "Order Refunded",
      "Your order has been refunded",
      `
        <h1>Order Cancelled & Refunded</h1>
        <p>If you have any questions, please contact support.</p>
      `
    );

    res.json({ message: "Order refunded and user notified via email", refund });
  } catch (err) {
    console.error("Refund failed:", err);
    res.status(500).json({ error: err.message });
  }
};

