const express = require("express");
const router = express.Router();
const { createExamResult } = require("../controllers/examResultController");
const {
  requireSignin,
  isAuthenticated,
  isTeacher,
} = require("../middleware/auth");

router.post(
  "/examResult",
  requireSignin,
  isAuthenticated,
  isTeacher,
  createExamResult
);

module.exports = router;
