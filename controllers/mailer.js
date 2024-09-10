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

async function sendEmailInvite(req, res) {
  try {
    const { senderEmail, receiverEmail, emailSubject, emailBody } = req.body;

    await sendEmail({
      senderEmail,
      receiverEmail,
      emailSubject,
      emailBody,
    });

    res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { sendEmail, sendEmailInvite };
