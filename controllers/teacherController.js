const Questionnaire = require("../models/questionnaireModel");
const Exam = require("../models/examModel");
const Answer = require("../models/answerModel");

// Create an exam for a teacher
exports.createExam = async (req, res) => {
  try {
    const { startDateTime, expiryDateTime, questions } = req.body;

    const newExam = new Exam({ startDateTime, expiryDateTime, questions });
    await newExam.save();
    res
      .status(201)
      .json({ message: "Exam created successfully", exam: newExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove a question from a questionnaire for a teacher
exports.removeQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    // Implement the logic to remove a question
    res.status(200).json({ message: "Question removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Review answers for an exam for a teacher
exports.reviewAnswers = async (req, res) => {
  try {
    const { userId, examId } = req.params;
    // Check if the user is a teacher
    if (req.user.userType !== "Teacher") {
      return res
        .status(403)
        .json({ message: "Forbidden - Teacher access required" });
    }
    // Fetch and review answers for the exam
    const answers = await Answer.find({ exam: examId }).populate(
      "candidate",
      "name"
    );
    res.status(200).json({ answers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
