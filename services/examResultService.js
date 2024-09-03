const ExamResult = require("../models/examResultModel");

async function createExamResult({ candidate, exam, score, resultStatus }) {
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
}

module.exports = { createExamResult };
