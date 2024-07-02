const mongoose = require("mongoose");
const User = require("./userModel");
const Exam = require("./examModel");
const Question = require("./questionModel");

const answerSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam.questions",
        required: true,
      },
      selectedOption: String,
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pass", "fail"],
    default: "pass",
    required: true,
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
