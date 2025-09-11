require("dotenv").config();
const sendEmail = require("./Utils/email");

sendEmail(
  "test@example.com",
  "Hello from Mailtrap 🎉",
  "This is a plain text test email.",
  "<b>This is an HTML test email!</b>"
);
