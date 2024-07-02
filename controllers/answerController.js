const Answer = require("../models/answerModel");

// Create or get answer for a candidate
exports.createOrGetAnswer = async (req, res) => {
  try {
    const { userId, examId, userResponses, totalMarks, passOrFail } = req.body;

    // Check if the user already has an answer for the given exam
    // const existingAnswer = await Answer.findOne({
    //   candidate: userId,
    //   exam: examId,
    // });

    // if (existingAnswer) {
    //   return res.status(200).json({ answer: existingAnswer });
    // }

    // Create a new answer for the candidate
    const newAnswer = new Answer({
      candidate: userId,
      exam: examId,
      userResponses,
      totalMarks,
      passOrFail,
    });
    await newAnswer.save();
    res
      .status(201)
      .json({ message: "Answer created successfully", answer: newAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Edit or exit answer for a candidate
exports.editOrExitAnswer = async (req, res) => {
  try {
    const { userId, examId, answerId } = req.params;
    const updates = req.body;
    const updatedAnswer = await Answer.findByIdAndUpdate(answerId, updates, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Answer updated successfully", answer: updatedAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all answers for an exam (host view)
exports.getAllAnswersOfExam = async (req, res) => {
  try {
    const { userId, examId } = req.params;
    // Check if the user is the host (teacher or admin)
    // For simplicity, assume only teacher and admin can view all answers
    if (req.user.userType !== "Teacher" && req.user.userType !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden - Teacher or Admin access required" });
    }
    // Get all answers for the exam
    const allAnswers = await Answer.find({ exam: examId }).populate(
      "candidate",
      "name"
    );
    res.status(200).json({ answers: allAnswers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get answer of a candidate
exports.getAnswerOfCandidate = async (req, res) => {
  try {
    const { userId, examId } = req.params;
    // Check if the user is the candidate
    if (req.user._id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden - Candidate access required" });
    }
    // Get the answer for the candidate
    const candidateAnswer = await Answer.findOne({
      candidate: userId,
      exam: examId,
    })
      .populate("candidate") // Populate the candidate details
      .populate("exam"); // Populate the exam details

    if (!candidateAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    const response = {
      candidate: candidateAnswer.candidate,
      exam: candidateAnswer.exam,
      answers: candidateAnswer.answers,
      submittedAt: candidateAnswer.submittedAt,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find();
    res.status(200).json({ answers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
