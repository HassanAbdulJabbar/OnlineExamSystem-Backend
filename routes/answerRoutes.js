// answerRoutes.js
const express = require("express");
const router = express.Router();
const {
  createOrGetAnswer,
  editOrExitAnswer,
  getAllAnswers,
  getAnswerOfCandidate,
} = require("../controllers/answerController");

router.post("/answer", createOrGetAnswer);
router.put("/answer/:answerId", editOrExitAnswer);
router.get("/answer/exam", getAllAnswers);
router.post("/answer/:userId/exam/:examId", getAnswerOfCandidate);

module.exports = router;
