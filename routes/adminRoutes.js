// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Middleware to ensure only admin can access these routes
// router.use(adminController.authenticateAdmin);

// Routes for adding/removing/updating teachers and students (from the adminController.js)
router.post("/addTeacher", adminController.addTeacher);
router.delete("/removeTeacher/:teacherId", adminController.removeTeacher);
router.put("/updateTeacher/:teacherId", adminController.updateTeacher);
router.post("/addStudent", adminController.addStudent);
router.delete("/removeStudent/:studentId", adminController.removeStudent);
router.put("/updateStudent/:studentId", adminController.updateStudent);
// Routes for additional admin features
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
