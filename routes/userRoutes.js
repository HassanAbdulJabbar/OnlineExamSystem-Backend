// userRoutes.js
const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");
// const { requireSignin, isAuthenticated } = require("../middleware/auth");
router.get("/user", getUser);
router.get("/users/:userId", getUserById);
router.get("/users", getAllUsers);
// router.put("/user/:userId", requireSignin, isAuthenticated, updateUser);
// router.delete("/user/:userId", requireSignin, isAuthenticated, removeUser);

module.exports = router;
