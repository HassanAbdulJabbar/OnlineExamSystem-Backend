const express = require("express");
const router = express.Router();
const { signin, signup, logout } = require("../middleware/login");

router.post("/auth/signin", signin);
router.post("/auth/signup", signup);

module.exports = router;
