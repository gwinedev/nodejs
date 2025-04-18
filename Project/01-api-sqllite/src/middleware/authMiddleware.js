// intercepts the request or response
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  // read token from headers (being handled in fronthead)
  const token = req.headers("authorization");

  if (!token) {
    res.status(401).json({ message: "No token provided" });
  }
  // verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // if token is right, modify the request
    req.userId = decoded.id;
    // next() carryon to your endpoint(route)
    next();
  });
}

export default authMiddleware
