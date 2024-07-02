const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

const validateToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const existingUser = await user
        .findById(decodedToken?.id)
        .where("role")
        .eq(decodedToken?.role);

      if (existingUser) {
        req.token = decodedToken;
        req.role = decodedToken.role;
      }
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  validateToken,
};
