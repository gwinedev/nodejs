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
  console.log("Password before saving", this.password);
  if (!this.isModified("password")) return next();
  //Create a cryptographic salt to make the hash more secure
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the salt and Replace the raw password with its hashed version
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password")) return next();

//   bcrypt
//     .genSalt(10)
//     .then((salt) => {
//       return bcrypt.hash(this.password, salt);
//     })
//     .then((hash) => {
//       this.password = hash;
//       next(); // ✅ finally call next when hashing is done
//     })
//     .catch((err) => {
//       next(err); // pass any error to Mongoose
//     });
// });

module.exports = mongoose.model("User", userSchema);
