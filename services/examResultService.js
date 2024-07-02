// examResultService.js
const ExamResult = require("../models/examResultModel");

exports.createExamResult = async ({ candidate, exam, score, resultStatus }) => {
  try {
    const newExamResult = new ExamResult({
      candidate,
      exam,
      score,
      resultStatus,
    });
    await newExamResult.save();
    return newExamResult;
  } catch (error) {
    throw error;
  }
};
