const Exam = require("../models/examModel");

async function createExam({ title, startDateTime, expiryDateTime, questions }) {
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
}

async function createExamWithDeadline(req, res) {
  try {
    const { title, questions } = req.body;

    // Create a new exam
    const newExam = new Exam({
      title,
      questions,
    });

    await newExam.save();

    res
      .status(201)
      .json({ message: "Exam created successfully", exam: newExam });
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function removeQuestionFromExam(
  examId,
  questionId,
  startDateTime,
  expiryDateTime
) {
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
}

async function scheduleExam(examId, startDateTime, expiryDateTime) {
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
}

async function getExamDetails(examId) {
  try {
    const exam = await Exam.findById(examId);
    return exam;
  } catch (error) {
    throw error;
  }
}

async function reviewAnswers(examId) {
  try {
    const answersToReview = await Answer.find({ exam: examId }).populate(
      "candidate",
      "name"
    );
    return answersToReview;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createExam,
  createExamWithDeadline,
  removeQuestionFromExam,
  scheduleExam,
  getExamDetails,
  reviewAnswers,
};
