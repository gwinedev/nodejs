// This middleware will check every request to protected routes:
// Is there a token?
// Is it valid?
// Whose token is it?

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

//   req.headers.authorization	Looks for the token header
// Ensures format is Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        // Extract just the token part
      token = req.headers.authorization.split(" ")[1];
    //   Checks if the token is real and hasn’t expired
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   Attaches the user to the request object
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authrized, no token");
  }
};

module.exports = protect;
