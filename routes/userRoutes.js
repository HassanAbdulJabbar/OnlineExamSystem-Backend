const express = require("express");
const router = express.Router();
const { getUser, getUserById } = require("../controllers/userController");
// const { requireSignin, isAuthenticated } = require("../middleware/auth");
router.get("/user", getUser);
router.get("/users/:userId", getUserById);
// router.get("/users", getAllUsers);
// router.put("/user/:userId", updateUser);
// router.delete("/user/:userId", removeUser);

module.exports = router;
