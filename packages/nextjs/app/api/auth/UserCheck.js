const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../../models/user"); // Adjust the path as needed
const router = express.Router();
const cors = require("cors");

router.use(cors());

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: "FAILED", message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: "FAILED", message: "Incorrect password" });
    }

    res.json({
      status: "SUCCESS",
      message: "Signin successful",
      _id: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "An error occurred",
      error: error.message,
    });
  }
});

module.exports = router;
