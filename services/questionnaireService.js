const Questionnaire = require("../models/questionnaireModel");
const Exam = require("../models/examModel");

async function createQuestionnaire(
  teacherId,
  questions,
  startDateTime,
  expiryDateTime
) {
  try {
    const newQuestionnaire = new Questionnaire({
      teacher: teacherId,
      questions,
      startDateTime,
      expiryDateTime,
    });
    await newQuestionnaire.save();
    return newQuestionnaire;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating questionnaire");
  }
}

async function approveQuestionnaire(questionnaireId) {
  try {
    await Questionnaire.findByIdAndUpdate(questionnaireId, {
      status: "Approved",
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error approving questionnaire");
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
async function getExamDetails(req, res) {
  try {
    const exams = await Exam.find();
    res.status(200).json({ exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createQuestionnaire,
  removeQuestionFromExam,
  approveQuestionnaire,
  getExamDetails,
};
