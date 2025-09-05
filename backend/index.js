const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser")

const Authrouter = require("./routes/AuthRouter");
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes")
const usersRoutes = require("./routes/usersRoutes")
const cartRoutes = require("./routes/cartRoutes")
const orderRoutes = require("./routes/orderRoutes")
const ordersRoutes = require("./routes/ordersRoutes")
const wishlistRoutes = require("./routes/wishlistRouter")


const app = express();


// Middleware
app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin:[ "http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
)

// Routes
app.use("/auth", Authrouter);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/users", usersRoutes)
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes)
app.use("/api/orders", ordersRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Static folder for images
app.use("/uploads", express.static("uploads"));

// Error handler (to prevent crashes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

const PORT = process.env.PORT || 8000;

// DB + Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
