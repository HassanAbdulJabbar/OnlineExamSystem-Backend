const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { validateToken } = require("../middleware/getToken");

router.post(
  "/addTeacher",
  // adminController.authenticateUser,
  adminController.addTeacher
);
router.delete(
  "/removeTeacher/:teacherId",
  // adminController.authenticateUser,
  adminController.removeTeacher
);
router.put(
  "/updateTeacher/:teacherId",
  // adminController.authenticateUser,
  adminController.updateTeacher
);
router.post(
  "/addStudent",
  // adminController.authenticateUser,
  adminController.addStudent
);
router.delete(
  "/removeStudent/:studentId",
  // adminController.authenticateUser,
  adminController.removeStudent
);
router.put(
  "/updateStudent/:studentId",
  // adminController.authenticateUser,
  adminController.updateStudent
);

router.put(
  "/approveQuestionnaire/:questionnaireId",
  // adminController.authenticateUser,
  adminController.approveQuestionnaire
);
router.put(
  "/disapproveQuestionnaire/:questionnaireId",
  // adminController.authenticateUser,
  adminController.disapproveQuestionnaire
);
router.get("/viewExamScores/:examId", adminController.viewExamScores);
router.put(
  "/cancelExam/:questionnaireId",
  // adminController.authenticateUser,
  adminController.cancelExam
);

module.exports = router;
