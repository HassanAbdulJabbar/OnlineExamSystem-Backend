const express = require("express");
const router = express.Router();
const examApproval = require("../controllers/examApprovalController");

router.get("/examApprovals", examApproval.getApprovdeExams);

router.get("/examApprovals/:approvalId", examApproval.getApprovedExamsById);

module.exports = router;
