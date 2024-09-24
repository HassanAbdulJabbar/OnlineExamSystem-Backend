const express = require("express");
const router = express.Router();
const mailer = require("../controllers/mailer");
const { validateToken } = require("../middleware/validateToken");

router.post("/send-invite", validateToken, mailer.sendEmailInvite);

module.exports = router;
