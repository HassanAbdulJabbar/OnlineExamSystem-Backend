const Exam = require("../models/examModel");
const ExamResult = require("../models/examResultModel");
const Answer = require("../models/answerModel");

// View available exams for a student
exports.viewAvailableExams = async (req, res) => {
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
};

// Attempt an exam for a student
exports.attemptExam = async (req, res) => {
  try {
    const { userId, examId } = req.body;
    // Check if the user is the candidate
    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - Candidate access required" });
    }
    // Check if the exam is currently active
    const exam = await Exam.findById(examId);
    const now = new Date();
    if (now < exam.startDateTime || now > exam.expiryDateTime) {
      return res.status(403).json({ message: "Forbidden - Exam not active" });
    }
    // Check if the candidate has already attempted the exam
    const existingAnswer = await Answer.findOne({
      candidate: userId,
      exam: examId,
    });
    if (existingAnswer) {
      return res
        .status(400)
        .json({ message: "Bad Request - Exam already attempted" });
    }
    // Implement the logic to handle exam attempts by students
    // Create a new answer for the candidate
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
};

// View exam scores for a student
exports.viewExamScores = async (req, res) => {
  try {
    const { userId, examId } = req.params;
    // Check if the user is the candidate
    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - Candidate access required" });
    }
    // Fetch the exam result for the candidate
    const examResult = await ExamResult.findOne({
      candidate: userId,
      exam: examId,
    });
    res.status(200).json({ examResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
