const mailService = require("../services/mailService");

async function sendEmailInvite(req, res) {
  try {
    const { senderEmail, receiverEmail, emailSubject, emailBody } = req.body;

    await mailService.sendEmail({
      senderEmail,
      receiverEmail,
      emailSubject,
      emailBody,
    });

    res.status(200).json({ message: "Invite sent successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occured while sending email to the user." });
  }
}

module.exports = { sendEmailInvite };
