const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const mailer = require("./routes/invite");
const answerRoutes = require("./routes/answerRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoutes");
const examApprovalRoutes = require("./routes/examApprovalRoute");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("dotenv").config();

mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(5002, () => console.log("Server is running at port 5002/-"))
  )
  .catch((error) => console.log(error.message));

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/mailer", mailer);

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/anwers", answerRoutes);
app.use("/authRoutes", authRoutes);
app.use("/examdetailroute", studentRoutes);
app.use("/api", userRoutes);
app.use("/apii", examRoutes);
app.use("/examapprovals", examApprovalRoutes);
app.use("/api/admin", adminRoutes);
