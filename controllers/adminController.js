require("dotenv").config();
const User = require("../models/userModel");
const Questionnaire = require("../models/questionnaireModel");
const ExamResult = require("../models/examResultModel");
const ExamApproval = require("../models/examApprovalModel");
const adminService = require("../services/adminOperationService");

async function addUser(req, res) {
  try {
    const { name, email, password, userType } = req.body;
    const newUser = await adminService.createUser({
      name,
      email,
      password,
      userType,
    });
    res.status(201).json({ message: "Teacher added successfully" });
    console.log("Newly added user details: ", newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function removeTeacher(req, res) {
  try {
    const teacherId = req.params.teacherId;
    await User.findByIdAndRemove(teacherId);
    res.status(200).json({ message: "Teacher removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateTeacher(req, res) {
  try {
    const teacherId = req.params.teacherId;
    const updates = req.body;
    const updatedTeacher = await User.findByIdAndUpdate(teacherId, updates, {
      new: true,
    });
    res.status(200).json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function addStudent(req, res) {
  try {
    const { name, email, password, profilePicture } = req.body;
    const newUser = new User({
      name,
      email,
      password,
      userType: "Student",
      profilePicture,
    });
    await newUser.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function removeStudent(req, res) {
  try {
    const studentId = req.params.studentId;
    await User.findByIdAndRemove(studentId);
    res.status(200).json({ message: "Student removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateStudent(req, res) {
  try {
    const studentId = req.params.studentId;
    const updates = req.body;
    const updatedStudent = await User.findByIdAndUpdate(studentId, updates, {
      new: true,
    });
    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function approveQuestionnaire(req, res) {
  try {
    const questionnaireId = req.params.questionnaireId;

    await Questionnaire.findByIdAndUpdate(questionnaireId, {
      status: "Approved",
    });

    await ExamApproval.findOneAndUpdate(
      { exam: questionnaireId },
      { approved: "approved", approvalDate: new Date() },
      { upsert: true }
    );

    res.status(200).json({ message: "Questionnaire approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function disapproveQuestionnaire(req, res) {
  try {
    const questionnaireId = req.params.questionnaireId;

    await Questionnaire.findByIdAndUpdate(questionnaireId, {
      status: "Disapproved",
    });

    await ExamApproval.findOneAndUpdate(
      { exam: questionnaireId },
      { approved: "Disapproved", approvalDate: new Date() },
      { upsert: true }
    );

    res.status(200).json({ message: "Questionnaire disapproved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function viewExamScores(req, res) {
  try {
    const examId = req.params.examId;
    const examResults = await ExamResult.find({ exam: examId }).populate(
      "student",
      "name"
    );
    res.status(200).json({ examResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function cancelExam(req, res) {
  try {
    const questionnaireId = req.params.questionnaireId;

    await Questionnaire.findByIdAndUpdate(questionnaireId, {
      status: "Cancelled",
    });

    await ExamApproval.findOneAndUpdate(
      { exam: questionnaireId },
      { approved: "Cancelled", approvalDate: new Date() },
      { upsert: true }
    );

    res.status(200).json({ message: "Exam canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to cancel the exam" });
  }
}

module.exports = {
  addUser,
  removeTeacher,
  updateTeacher,
  addStudent,
  removeStudent,
  updateStudent,
  approveQuestionnaire,
  disapproveQuestionnaire,
  viewExamScores,
  cancelExam,
};
