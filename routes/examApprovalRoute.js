const express = require("express");
const router = express.Router();
const examApproval = require("../controllers/examApprovalController");
const { validateToken } = require("../middleware/validateToken");

router.get("/examApprovals", validateToken, examApproval.getApprovdeExams);

router.get(
  "/examApprovals/:approvalId",
  validateToken,
  examApproval.getApprovedExamsById
);

module.exports = router;
