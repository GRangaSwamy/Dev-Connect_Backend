const express = require('express');
const {validateSignUpData} = require('../utils/validation')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
authRouter.post('/signup', async (req, res) => {
  try {
    // Validate input data first
    const {password} = req.body;
    const{firstName, lastName,email,age,gender} = req.body;
    validateSignUpData(req);
    const pwdHash = await bcrypt.hash(password,10)
    console.log("Hashed Password: ", pwdHash);
    const user = new User({
      firstName,lastName,email,password:pwdHash,age,gender
    });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Invalid email ID");
    }
    const isPwdValid = await user.validatePassword(password);
    if (isPwdValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
            httpOnly: true,
            secure: true,      // must be true for HTTPS
            sameSite: "none",  // required for cross-site cookies
            maxAge: 1000 * 60 * 60 * 24 // 1 day
        });
      return res.send(user);
    }
    return res.status(400).send("Invalid password");

  } catch (err) {
    res.status(400).send("Error in login. Try again later");
  }
});
authRouter.post('/logout', async (req, res) => {
    res.clearCookie("token");
    res.send("Logout Successful");
});
module.exports = authRouter;