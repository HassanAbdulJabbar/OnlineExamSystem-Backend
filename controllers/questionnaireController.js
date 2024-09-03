const Questionnaire = require("../models/questionnaireModel");

async function createQuestionnaire(req, res) {
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
}

async function updateQuestionnaire(req, res) {
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
}

async function approveQuestionnaire(req, res) {
  try {
    const questionnaireId = req.params.questionnaireId;
    if (req.user.userType !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Admin access required" });
    }

    await Questionnaire.findByIdAndUpdate(questionnaireId, {
      status: "Approved",
    });
    res.status(200).json({ message: "Questionnaire approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  createQuestionnaire,
  updateQuestionnaire,
  approveQuestionnaire,
};
