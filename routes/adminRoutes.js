const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// router.use(adminController.authenticateAdmin);

router.post("/addTeacher", adminController.addTeacher);
router.delete("/removeTeacher/:teacherId", adminController.removeTeacher);
router.put("/updateTeacher/:teacherId", adminController.updateTeacher);
router.post("/addStudent", adminController.addStudent);
router.delete("/removeStudent/:studentId", adminController.removeStudent);
router.put("/updateStudent/:studentId", adminController.updateStudent);

router.put(
  "/approveQuestionnaire/:questionnaireId",
  adminController.approveQuestionnaire
);
router.put(
  "/disapproveQuestionnaire/:questionnaireId",
  adminController.disapproveQuestionnaire
);
router.get("/viewExamScores/:examId", adminController.viewExamScores);
router.put("/cancelExam/:questionnaireId", adminController.cancelExam);

module.exports = router;
