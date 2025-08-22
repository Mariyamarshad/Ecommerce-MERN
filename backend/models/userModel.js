const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    }
  },
  {
    timestamps: true, 
  }
);

// Create model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
