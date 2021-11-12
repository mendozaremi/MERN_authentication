const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"]
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: 6,
    select: false
  },
  resetpasswordToken: String,
  resetPasswordExpire: Date
});

// middleware to check if password modified
UserSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

UserSchema.methods.matchPasswords = async function(password) {
  return await bcrypt.compare(password, this.password);
}

UserSchema.methods.getSignedToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE,})
} 

const User = mongoose.model("User", UserSchema);

module.exports = UserSchema;