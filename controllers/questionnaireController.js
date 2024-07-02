const Questionnaire = require("../models/questionnaireModel");

// Create a new questionnaire
exports.createQuestionnaire = async (req, res) => {
  try {
    const { teacher, questions } = req.body;
    const newQuestionnaire = new Questionnaire({ teacher, questions });
    await newQuestionnaire.save();
    res.status(201).json({
      message: "Questionnaire created successfully",
      questionnaire: newQuestionnaire,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a questionnaire
exports.updateQuestionnaire = async (req, res) => {
  try {
    const questionnaireId = req.params.questionnaireId;
    const updates = req.body;
    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(
      questionnaireId,
      updates,
      { new: true }
    );
    res.status(200).json({
      message: "Questionnaire updated successfully",
      questionnaire: updatedQuestionnaire,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Approve a questionnaire (Admin only)
exports.approveQuestionnaire = async (req, res) => {
  try {
    const questionnaireId = req.params.questionnaireId;
    // Check if the user is an admin
    if (req.user.userType !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Admin access required" });
    }
    // Approve the questionnaire
    await Questionnaire.findByIdAndUpdate(questionnaireId, {
      status: "Approved",
    });
    res.status(200).json({ message: "Questionnaire approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
