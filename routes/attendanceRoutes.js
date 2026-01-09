const express = require("express");
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const exists = await Attendance.findOne({ date: req.body.date });
  if (exists) return res.status(400).json("Attendance already marked");

  await new Attendance(req.body).save();
  res.json("Attendance saved successfully");
});

module.exports = router;
