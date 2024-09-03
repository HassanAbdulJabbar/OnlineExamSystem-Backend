const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

const signup = async (req, res) => {
  const { name, email, password, confirmPassword, userType } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(402).json({ message: "Passwords do not match" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      userType,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error in signin:", error); // Log the error for debugging
    res.status(400).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });

  try {
    const existingUser = await User.findOne({ email });

    const checkPassword = await bcrypt.compare(password, existingUser.password);
    console.log(existingUser);

    if (!checkPassword || !existingUser) {
      return res
        .status(400)
        .json({ message: "Either Username or password is incorrect." });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: false,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ existingUser, token });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin };
