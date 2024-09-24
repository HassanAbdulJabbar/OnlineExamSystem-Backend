const express = require("express");
const router = express.Router();
const examResultController = require("../controllers/examResultController");
const { validateToken } = require("../middleware/validateToken");
const {
  requireSignin,
  isAuthenticated,
  isTeacher,
} = require("../middleware/auth");

router.post(
  "/examResult",
  validateToken,
  examResultController.createExamResult
);

module.exports = router;
