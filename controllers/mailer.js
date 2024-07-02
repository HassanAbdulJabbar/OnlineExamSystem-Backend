// mailer.js
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Add your Gmail email address
    pass: process.env.NODEMAILER_PASSWORD, // Add your Gmail password
  },
});

exports.sendEmail = ({
  senderEmail,
  receiverEmail,
  emailSubject,
  emailBody,
}) => {
  const data = {
    from: senderEmail,
    to: receiverEmail,
    subject: emailSubject,
    text: emailBody,
  };

  transporter.sendMail(data, (error, info) => {
    if (error) console.log("Error sending email:", error);
    else console.log("Email sent:", data, info.response);
  });
};
