const Exam = require("../models/examModel");
const ExamApproval = require("../models/examApprovalModel");
const examService = require("../services/examService");

async function scheduleExam(req, res) {
  try {
    const {
      title,
      questions,
      startDateTime,
      expiryDateTime,
      teacher: teacherId,
    } = req.body;

    const newExam = await examService.createExam({
      teacher: teacherId,
      title,
      startDateTime,
      expiryDateTime,
      questions,
    });

    res
      .status(201)
      .json({ message: "Exam scheduled successfully", exam: newExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAllExams(req, res) {
  try {
    const exams = await examService.getAllExams();

    res.status(200).json({ exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function removeExam(req, res) {
  try {
    const { examId } = req.params;

    const deletedExam = await examService.DeleteExam(examId);

    res.status(200).json({ message: "Exam removed successfully", deletedExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  scheduleExam,
  getAllExams,
  removeExam,
};
