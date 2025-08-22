const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Connected to MongoDB (Compass)");
  } catch (err) {
    console.error(" Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
