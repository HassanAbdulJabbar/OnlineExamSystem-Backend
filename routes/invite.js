const express = require("express");
const router = express.Router();
const mailer = require("../controllers/mailer");

router.post("/send-invite", mailer.sendEmailInvite);

module.exports = router;
