const express = require("express");
const router = express.Router();
const { signin, signup } = require("../middleware/login");

router.post("/auth/signin", signin);
router.post("/auth/signup", signup);

module.exports = router;
