const mailer = require("../routes/invite");
const answerRoutes = require("../routes/answerRoutes");
const studentRoutes = require("../routes/studentRoutes");
const adminRoutes = require("../routes/adminRoutes");
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const examRoutes = require("../routes/examRoutes");
const examApprovalRoutes = require("../routes/examApprovalRoute");

module.exports = {
  mailer,
  answerRoutes,
  studentRoutes,
  adminRoutes,
  authRoutes,
  userRoutes,
  examRoutes,
  examApprovalRoutes,
};
