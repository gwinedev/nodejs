const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../middleware/asyncHandler");

// register new user
exports.registerUser = asyncHandler(async (req, res) => {
  // Extract user details from the body of the request
  const { name, email, password } = req.body;

  // Prevents duplicate accounts with the same email
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  // The password gets hashed automatically
  // (thanks to .pre('save') in your model)

  console.log("Incoming data", req.body);

  const user = await User.create({ name, email, password });
  console.log("User created", user.name);

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// Login user
exports.loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Find user by emai
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user_.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
