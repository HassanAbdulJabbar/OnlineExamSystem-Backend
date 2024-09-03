const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function createUser({ name, email, password, userType, profilePicture }) {
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
}

async function getAllUsers() {
  try {
    const users = await User.find().select("-password");
    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findById(userId).select("-password");
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(userId, updates) {
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
}

async function removeUser(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.remove();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  removeUser,
};
