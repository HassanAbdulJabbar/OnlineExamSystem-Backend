const jwt = require("jsonwebtoken");
const user = require("../models/userModel");

async function validateToken(req, res, next) {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

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
}

module.exports = {
  validateToken,
};
