const { transporter } = require("../app_state/mailer-state");

async function sendEmail({
  senderEmail,
  receiverEmail,
  emailSubject,
  emailBody,
}) {
  const data = {
    from: senderEmail,
    to: receiverEmail,
    subject: emailSubject,
    text: emailBody,
  };

  transporter.sendMail(data, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", data, info.response);
    }
  });
}

module.exports = { sendEmail };
