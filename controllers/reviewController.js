// ReviewController.js
const Answer = require("../models/answerModel");

// Review an answer by a teacher or admin
exports.reviewAnswer = async (req, res) => {
  try {
    const { userId, examId, answerId } = req.params;
    const { score, feedback } = req.body;
    const reviewedAnswer = await Answer.findByIdAndUpdate(
      answerId,
      { $set: { reviewed: true, score, feedback } },
      { new: true }
    );
    res.status(200).json({
      message: "Answer reviewed successfully",
      answer: reviewedAnswer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
