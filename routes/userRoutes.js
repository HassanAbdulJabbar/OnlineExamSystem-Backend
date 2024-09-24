const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserById,
  getAllUsers,
} = require("../controllers/userController");
const { validateToken } = require("../middleware/validateToken");

router.get("/user", validateToken, getUser);
router.get("/users/:userId", validateToken, getUserById);
router.get("/users", validateToken, getAllUsers);
// router.put("/user/:userId", updateUser);
// router.delete("/user/:userId", removeUser);

module.exports = router;
