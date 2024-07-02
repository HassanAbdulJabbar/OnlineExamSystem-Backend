const mongoose = require("mongoose");
const Exam = require("./examModel");

const approvalStatusEnum = ["approved", "disapproved", "cancelled"];

const examApprovalSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  approved: {
    type: String,
    enum: approvalStatusEnum,
    default: "pending",
  },
  approvalDate: {
    type: Date,
    default: Date.now,
  },
  approver: {
    type: mongoose.Schema.Types.ObjectId,
    default: "Admin",
  },
  comments: {
    type: String, // You can set a default status if needed
  },
  // Add any other fields related to approval or disapproval
});

const ExamApproval = mongoose.model("ExamApproval", examApprovalSchema);

module.exports = ExamApproval;
