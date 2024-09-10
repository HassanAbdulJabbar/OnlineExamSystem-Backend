const User = require("../models/userModel");

async function getUser(req, res) {
  req.profile.password = undefined;
  return res.json(req.profile);
}

async function getUserById(req, res, next, id) {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with given Id not found.",
      });
    }
    req.profile = user;
    next();
  });
}

async function getAllUsers(req, res) {
  User.find({}, { password: 0 }).exec((err, users) => {
    if (err) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    return res.json(users);
  });
}

module.exports = {
  getUser,
  getUserById,
  getAllUsers,
};
