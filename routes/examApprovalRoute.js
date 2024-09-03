const express = require("express");
const router = express.Router();

const ExamApproval = require("../models/examApprovalModel");

router.get("/examApprovals", async (req, res) => {
  try {
    const approvals = await ExamApproval.find();
    res.json(approvals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/examApprovals/:approvalId", async (req, res) => {
  const { approvalId } = req.params;

  try {
    const approval = await ExamApproval.findById(approvalId);
    if (!approval) {
      return res.status(404).json({ message: "Exam approval not found" });
    }

    res.json(approval);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
