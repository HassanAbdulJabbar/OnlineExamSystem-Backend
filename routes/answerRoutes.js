const express = require("express");
const {
  createOrGetAnswer,
  editOrExitAnswer,
  getAllAnswers,
  getAnswerOfCandidate,
} = require("../controllers/answerController");

const router = express.Router();

router.post("/answer", createOrGetAnswer);
router.put("/answer/:answerId", editOrExitAnswer);
router.get("/answer/exam", getAllAnswers);
router.post("/answer/:userId/exam/:examId", getAnswerOfCandidate);

module.exports = router;
