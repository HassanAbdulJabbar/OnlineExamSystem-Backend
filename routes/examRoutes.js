const express = require("express");
const router = express.Router();
const {
  scheduleExam,
  removeExam,
  getAllExams,
} = require("../controllers/examController");
const { validateToken } = require("../middleware/validateToken");

router.post("/exams", validateToken, scheduleExam);
router.get("/examslist", validateToken, getAllExams);
router.delete("/exams/:examId", validateToken, removeExam);

module.exports = router;
