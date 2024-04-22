const express = require("express");
const router = express.Router();
const authCheck = require("./UserCheck");

router.get("/protected-route", authCheck, (req, res) => {
  // Protected route logic
  res.json({ message: "This is a protected route" });
});

module.exports = router;
