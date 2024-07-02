const express = require("express");
const router = express.Router();

const {
  viewAvailableExams,
  attemptExam,
  viewExamScores,
} = require("../controllers/studentController");

router.get("/allexams", viewAvailableExams);
router.post("/attemptexam", attemptExam);
router.get("/exams/:examId", viewExamScores);

module.exports = router;
