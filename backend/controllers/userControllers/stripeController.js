const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../../models/Orders");

const PKR_TO_USD = 0.0036; 


exports.createCheckoutSession = async (req, res) => {
  try {
   


    const { items, shippingInfo } = req.body;
    const userId = req.user?.id;

    if (!items || items.length === 0) {
      return res.status(400).json({ 
        error: "No items in cart",
        details: "The request did not include any items to checkout." 
      });
    }

    const mappedItems = items
      .filter(i => i.name) 
      .map(i => ({
        productId: i._id || null,
        quantity: i.quantity,
        price: i.price,  // price in PKR
        name: i.name,
      }));

    if (mappedItems.length === 0) {
      return res.status(400).json({ 
        error: "No valid products in cart",
        details: "Products must include name, price, and quantity." 
      });
    }

    const totalAmountPKR = mappedItems.reduce((sum, i) => sum + i.price * i.quantity, 0) + 200;

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
      success_url: `${process.env.CLIENT_URL}/?payment=success`,
      cancel_url: `${process.env.CLIENT_URL}/?paymentfailed`,
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
      req.rawBody, // req.rawBody comes from express.raw() middleware
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const orderId = session.metadata.orderId;
      const order = await Order.findById(orderId);

      if (!order) {
        console.error("Order not found for webhook");
        return res.status(400).send("Order not found");
      }

      order.status = "paid";
      await order.save();

      console.log(` Order ${order._id} marked as paid`);
    } catch (err) {
      console.error(" Failed to update order after payment:", err);
    }
  }

  res.json({ received: true });
};
