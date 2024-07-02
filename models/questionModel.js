const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  exam: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["MultipleChoice", "TextBased"],
    required: true,
  },
  options: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
