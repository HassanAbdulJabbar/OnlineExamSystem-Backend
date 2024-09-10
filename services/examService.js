const Exam = require("../models/examModel");

async function createExam({
  title,
  startDateTime,
  expiryDateTime,
  questions,
  teacherId,
}) {
  try {
    const newExam = new Exam({
      title,
      startDateTime,
      expiryDateTime,
      questions,
      teacher: teacherId,
    });

    await newExam.save();

    return newExam;
  } catch (error) {
    console.error("An error occured in creating exam: ", error);
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

async function DeleteExam(examId) {
  try {
    const exam = await Exam.findByIdAndDelete(examId);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return exam;
  } catch (error) {
    throw error;
  }
}

async function getAllExams() {
  try {
    const exam = await Exam.find();

    if (!exam) {
      return res.status(404).json({ message: "No Exam found." });
    }
    return exam;
  } catch (error) {
    console.error("An error occured while fetching exams List: ", error);
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
  getAllExams,
  scheduleExam,
  DeleteExam,
  reviewAnswers,
};
