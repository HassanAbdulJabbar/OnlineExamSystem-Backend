const Questionnaire = require("../models/questionnaireModel");
const Exam = require("../models/examModel");
const Answer = require("../models/answerModel");

async function createExam(req, res) {
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
}

async function removeQuestion(req, res) {
  try {
    const { questionId } = req.params;
    res.status(200).json({ message: "Question removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function reviewAnswers(req, res) {
  try {
    const { userId, examId } = req.params;
    if (req.user.userType !== "Teacher") {
      return res
        .status(403)
        .json({ message: "Forbidden - Teacher access required" });
    }
    const answers = await Answer.find({ exam: examId }).populate(
      "candidate",
      "name"
    );
    res.status(200).json({ answers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createExam,
  removeQuestion,
  reviewAnswers,
};
