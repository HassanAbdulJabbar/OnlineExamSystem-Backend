const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

module.exports = function (app, app_config) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use("/anwers", app_config.answerRoutes);
  app.use("/authRoutes", app_config.authRoutes);
  app.use("/examdetailroute", app_config.studentRoutes);
  app.use("/api", app_config.userRoutes);
  app.use("/mailer", app_config.mailer);
  app.use("/apii", app_config.examRoutes);
  app.use("/examapprovals", app_config.examApprovalRoutes);
  app.use("/api/admin", app_config.adminRoutes);
};
