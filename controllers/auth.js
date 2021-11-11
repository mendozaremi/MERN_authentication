const User = require('../models/User')


exports.register = async (req, res, next) => {
  const {username, email, password} = req.body;

  try {
    const user = await User.create({
      username,
      email, 
      password
    })

    res.status(201).json({
      success: true,
      user: user
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }

}

exports.login = async (req, res, next) => {
  const {email, password } = req.body;

  if(!email || !password) {
    res.status(400).json({ success: false, error: "Please provide email and pasword"})
  }

  try {
    const user = await user.findOne({ email }).select("+password")

    if(!user) {
      res.status(404).json({ success: false, error: "Invalid credentials"})
    }

    const isMatch = await user.matchPassword(password)

    if(!isMatch) {
      res.status(404).json({success: false, error: "Invalid credentials"})
    }

    res.status(200).json({
      success: true,
      token: "t4rthj4398rt43y8"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message})
  }
};

exports.forgetpassword = (req, res, next) => {
  res.send("Forgot Password Route");
}

exports.resetpassword = (req, res, next) => {
  res.send("Reset Password Route");
}