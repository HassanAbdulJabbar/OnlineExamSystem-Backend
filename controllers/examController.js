// examController.js
const Exam = require("../models/examModel");
const ExamApproval = require("../models/examApprovalModel");

exports.scheduleExam = async (req, res) => {
  try {
    const {
      title,
      questions,
      startDateTime,
      expiryDateTime,
      teacher: teacherId,
    } = req.body;

    const newExam = new Exam({
      teacher: teacherId,
      title,
      startDateTime,
      expiryDateTime,
      questions,
    });
    

    await newExam.save();
    
    res
      .status(201)
      .json({ message: "Exam scheduled successfully", exam: newExam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({ exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeExam = async (req, res) => {
  try {
    const { examId } = req.params;

    // Find and delete the exam
    const deletedExam = await Exam.findByIdAndDelete(examId);

    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.status(200).json({ message: "Exam removed successfully", examId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
