const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash pawword before saving
userSchema.pre("save", async function (next) {
  // if password is still the same, don't hash it
  if (!this.isModified("password")) return next();
  //Create a cryptographic salt to make the hash more secure
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt and Replace the raw password with its hashed version
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema)