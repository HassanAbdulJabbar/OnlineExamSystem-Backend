// examService.js
const Exam = require("../models/examModel");
const Questionnaire = require("../models/questionnaireModel");

exports.createExam = async ({
  title,
  startDateTime,
  expiryDateTime,
  questions,
}) => {
  try {
    const newExam = new Exam({
      title,
      startDateTime,
      expiryDateTime,
      questions,
    });
    
    await newExam.save();

    return newExam;
  } catch (error) {
    throw error;
  }
};

exports.createExam = async (req, res) => {
  try {
    const { title, questions } = req.body;

    // Create a new exam
    const newExam = new Exam({
      title,
      questions,
    });

    // Save the exam to the database
    await newExam.save();

    // Respond with a success message
    res
      .status(201)
      .json({ message: "Exam created successfully", exam: newExam });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeQuestionFromExam = async (
  examId,
  questionId,
  startDateTime,
  expiryDateTime
) => {
  try {
    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      startDateTime,
      expiryDateTime,
      { $pull: { questions: questionId } },
      { new: true }
    );
    return updatedExam;
  } catch (error) {
    throw error;
  }
};

exports.scheduleExam = async (examId, startDateTime, expiryDateTime) => {
  try {
    const scheduledExam = await Exam.findByIdAndUpdate(
      examId,
      { startDateTime, expiryDateTime },
      { new: true }
    );
    return scheduledExam;
  } catch (error) {
    throw error;
  }
};

exports.getExamDetails = async (examId) => {
  try {
    const exam = await Exam.findById(examId);
    return exam;
  } catch (error) {
    throw error;
  }
};

exports.reviewAnswers = async (examId) => {
  try {
    const answersToReview = await Answer.find({ exam: examId }).populate(
      "candidate",
      "name"
    );
    return answersToReview;
  } catch (error) {
    throw error;
  }
};
