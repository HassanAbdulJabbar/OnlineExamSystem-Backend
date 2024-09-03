const Exam = require("../models/examModel");
const ExamResult = require("../models/examResultModel");
const Answer = require("../models/answerModel");

async function viewAvailableExams(req, res) {
  try {
    const availableExams = await Exam.find({
      startDateTime: { $lte: new Date() },
      expiryDateTime: { $gte: new Date() },
    });
    res.status(200).json({ exams: availableExams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function attemptExam(req, res) {
  try {
    const { userId, examId } = req.body;
    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - Candidate access required" });
    }

    const exam = await Exam.findById(examId);
    const now = new Date();
    if (now < exam.startDateTime || now > exam.expiryDateTime) {
      return res.status(403).json({ message: "Forbidden - Exam not active" });
    }

    const existingAnswer = await Answer.findOne({
      candidate: userId,
      exam: examId,
    });
    if (existingAnswer) {
      return res
        .status(400)
        .json({ message: "Bad Request - Exam already attempted" });
    }

    const newAnswer = new Answer({ candidate: userId, exam: examId });
    await newAnswer.save();
    res.status(201).json({
      message: "Exam attempt initiated successfully",
      answer: newAnswer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function viewExamScores(req, res) {
  try {
    const { userId, examId } = req.params;

    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - Candidate access required" });
    }

    const examResult = await ExamResult.findOne({
      candidate: userId,
      exam: examId,
    });
    res.status(200).json({ examResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  viewAvailableExams,
  attemptExam,
  viewExamScores,
};
