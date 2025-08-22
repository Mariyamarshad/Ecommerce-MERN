const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const Authrouter = require('./routes/AuthRouter')

const app = express();
app.use(cors());
app.use(express.json())
app.use("/auth", Authrouter)

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} `);
  });
});
