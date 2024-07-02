// examModel.js
const mongoose = require("mongoose");
const User = require("./userModel");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: {
    type: String,
  },
  marks: {
    type: Number,
    required: true,
  },
});

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Examination",
  },
  questions: [questionSchema],
  startDateTime: {
    type: Date,
    required: true,
  },
  expiryDateTime: {
    type: Date,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming your user model is named "User"
  },
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
