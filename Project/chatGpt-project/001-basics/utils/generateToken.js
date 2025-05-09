const jwt = require("jsonwebtoken");
// We use this to create a signed token that proves who a user is.

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken