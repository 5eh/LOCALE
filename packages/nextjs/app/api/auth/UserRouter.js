const User = require("../../../models/user");
const authCheck = require("./UserCheck");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (name === "" || email === "" || password === "") {
    return res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  }

  if (!/^[a-zA-Z -]*$/.test(name)) {
    return res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.json({
      status: "FAILED",
      message: "Invalid email entered",
    });
  }

  if (password.length < 8) {
    return res.json({
      status: "FAILED",
      message: "Password is too short!",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        status: "FAILED",
        message: "User with the provided email already exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.json({
      status: "SUCCESS",
      message: "Signup successful",
      data: savedUser,
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: "An error occurred while processing your request",
      error: err.message,
    });

    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  let { email, password, _id } = req.body;
  email = email.trim();
  password = password.trim();

  if (email === "" || password === "") {
    return res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: "FAILED",
        message: "Invalid credentials entered!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        status: "FAILED",
        message: "Invalid password entered1!",
      });
    }
    req.session.userId = user._id;
    res.json({
      status: "SUCCESS",
      message: "Signin successful",
      data: user,
    });
  } catch (err) {
    res.json({
      status: "FAILED",
      message: "An error occurred while processing your request",
      error: err.message,
    });
    console.log(err);
  }
});



module.exports = router;
