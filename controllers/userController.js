const User = require("../models/userModel");

// Middleware to get user by ID and store it in request object
exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user; // Store the user object in request
    next();
  });
};

// Controller method to get user details
exports.getUser = (req, res) => {
  // Profile is already populated in the request object due to middleware
  req.profile.password = undefined; // Exclude password from response
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find({}, { password: 0 }) // Exclude password from response
    .exec((err, users) => {
      if (err) {
        return res.status(500).json({
          error: "Internal Server Error",
        });
      }
      return res.json(users);
    });
};
