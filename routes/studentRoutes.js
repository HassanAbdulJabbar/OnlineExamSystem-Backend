const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/validateToken");
const {
  viewAvailableExams,
  attemptExam,
  viewExamScores,
} = require("../controllers/studentController");

router.get("/allexams", validateToken, viewAvailableExams);
router.post("/attemptexam", validateToken, attemptExam);
router.get("/exams/:examId", validateToken, viewExamScores);

module.exports = router;
