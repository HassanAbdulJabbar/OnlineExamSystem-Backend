// routes/invite.js
const express = require("express");
const router = express.Router();
const mailer = require("../controllers/mailer");

router.post("/send-invite", async (req, res) => {
  try {
    const { senderEmail, receiverEmail, emailSubject, emailBody } = req.body;

    // Sending the invite email
    await mailer.sendEmail({
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
});

module.exports = router;