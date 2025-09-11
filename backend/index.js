const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

// Routes
const AuthRouter = require("./routes/commonROutes/AuthRouter");
const productRoutes = require("./routes/commonROutes/productRoutes");
const dashboardRoutes = require("./routes/adminRoutes/dashboardRoutes");
const adminUsersRoutes = require("./routes/adminRoutes/adminUsersRoutes");
const adminOrdersRoutes = require("./routes/adminRoutes/adminOrderRoutes");
const userOrderRoutes = require("./routes/userRoutes/userOrderRoutes");
const paymentRoutes = require("./routes/userRoutes/paymentRoutes");

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// ⚡ Mount payment routes BEFORE express.json()
app.use("/api/payment", paymentRoutes);

// JSON parser for all other routes
app.use(express.json());

// Other routes
app.use("/auth", AuthRouter);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", adminUsersRoutes);
app.use("/api/order", userOrderRoutes);
app.use("/api/orders", adminOrdersRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
