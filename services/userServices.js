// userService.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async ({
  name,
  email,
  password,
  userType,
  profilePicture,
}) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      profilePicture,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.find().select("-password");
    return users;
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    return user;
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (userId, updates) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    Object.assign(user, updates);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

exports.removeUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.remove();
  } catch (error) {
    throw error;
  }
};
