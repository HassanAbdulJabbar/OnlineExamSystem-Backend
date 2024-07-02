// examResultModel.js
const mongoose = require("mongoose");

const examResultSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  resultStatus: {
    type: String,
    enum: ["Pass", "Fail"],
    required: true,
  },
});

const ExamResult = mongoose.model("ExamResult", examResultSchema);

module.exports = ExamResult;
