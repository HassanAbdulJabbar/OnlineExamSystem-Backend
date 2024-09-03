const express = require("express");

const router = express.Router();
const {
  scheduleExam,
  removeExam,
  getAllExams,
} = require("../controllers/examController");

router.post("/exams", scheduleExam);
router.get("/examslist", getAllExams);
router.delete("/exams/:examId", removeExam);

module.exports = router;
