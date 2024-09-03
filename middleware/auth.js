const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const authToken = token.split(" ")[1];
      let decodedData = jwt.decode(authToken);
      req.authToken = authToken;
    }
    next();
  } catch (error) {
    console.log("There was a error in validating the user.", error);
  }
};

module.exports = {
  validateToken,
};
