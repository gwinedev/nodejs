const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Checks if the token exist and starts with bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];

      // decode token and returns an obj containing the id stored in the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID and remove password field
      req.user = await User.findById(decoded.id).select("-password");
      // let the request go through
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token field" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
