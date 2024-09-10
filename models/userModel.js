const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["Admin", "Teacher", "Student"],
    required: true,
    default: "Student",
  },
  profilePicture: {
    type: String,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.userType === "Student") {
    this.profilePicture =
      "https://img1.cgtrader.com/items/4259562/fcc1f1114a/large/3d-avatar-profession-as-graduate-student-3d-model-fcc1f1114a.jpg";
  } else {
    this.profilePicture = null;
  }

  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
