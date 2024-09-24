const express = require("express");
const {
  createOrGetAnswer,
  editOrExitAnswer,
  getAllAnswers,
  getAnswerOfCandidate,
} = require("../controllers/answerController");
const { validateToken } = require("../middleware/validateToken");

const router = express.Router();

router.post("/answer", validateToken, createOrGetAnswer);
router.put("/answer/:answerId", validateToken, editOrExitAnswer);
router.get("/answer/exam", validateToken, getAllAnswers);
router.post(
  "/answer/:userId/exam/:examId",
  validateToken,
  getAnswerOfCandidate
);

module.exports = router;
