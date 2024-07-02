// answerService.js
const Answer = require("../models/answerModel");

exports.createAnswer = async ({ candidate, exam }) => {
  try {
    const newAnswer = new Answer({ candidate, exam });
    await newAnswer.save();
    return newAnswer;
  } catch (error) {
    throw error;
  }
};

exports.editAnswer = async (answerId, updates) => {
  try {
    const editedAnswer = await Answer.findByIdAndUpdate(answerId, updates, {
      new: true,
    });
    return editedAnswer;
  } catch (error) {
    throw error;
  }
};

exports.exitAnswer = async (answerId) => {
  try {
    const updatedAnswer = await Answer.findByIdAndUpdate(
      answerId,
      { $set: { reviewed: true } },
      { new: true }
    );
    return updatedAnswer;
  } catch (error) {
    throw error;
  }
};

exports.getAllAnswersOfExam = async (examId) => {
  try {
    const allAnswers = await Answer.find({ exam: examId }).populate(
      "candidate",
      "name"
    );
    return allAnswers;
  } catch (error) {
    throw error;
  }
};

exports.getAnswerOfCandidate = async (userId, examId) => {
  try {
    const answer = await Answer.findOne({ candidate: userId, exam: examId });
    return answer;
  } catch (error) {
    throw error;
  }
};
