// authRoutes.js
const express = require("express");
const router = express.Router();
const { signin, signup, logout } = require("../middleware/login");
// const { requireSignin } = require("../middleware/auth");

router.post("/auth/signin", signin);
router.post("/auth/signup", signup);
router.get("/auth/signout", logout);

module.exports = router;
