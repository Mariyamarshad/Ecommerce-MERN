const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: '"Exclusive" <no-reply@exclusive.com>',
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Email failed:", err);
  }
};

module.exports = sendEmail;
