const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { validateToken } = require("../middleware/validateToken");

router.post("/addTeacher", validateToken, adminController.addUser);
router.delete(
  "/removeTeacher/:teacherId",
  validateToken,
  adminController.removeTeacher
);
router.put(
  "/updateTeacher/:teacherId",
  validateToken,
  adminController.updateTeacher
);
router.post("/addStudent", validateToken, adminController.addStudent);
router.delete(
  "/removeStudent/:studentId",
  validateToken,
  adminController.removeStudent
);
router.put(
  "/updateStudent/:studentId",
  validateToken,
  adminController.updateStudent
);

router.put(
  "/approveQuestionnaire/:questionnaireId",
  validateToken,
  adminController.approveQuestionnaire
);
router.put(
  "/disapproveQuestionnaire/:questionnaireId",
  validateToken,
  adminController.disapproveQuestionnaire
);
router.get("/viewExamScores/:examId", adminController.viewExamScores);
router.put(
  "/cancelExam/:questionnaireId",
  validateToken,
  adminController.cancelExam
);

module.exports = router;
