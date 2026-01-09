const express = require("express");
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");
const router = express.Router();

/* PREVENT DUPLICATE ATTENDANCE */
router.post("/", auth, async (req, res) => {
  const exists = await Attendance.findOne({ date: req.body.date });
  if (exists) return res.status(400).json("Attendance already marked");

  await new Attendance(req.body).save();
  res.json("Attendance Saved");
});

router.get("/:date", auth, async (req, res) => {
  const data = await Attendance.findOne({ date: req.params.date })
    .populate("records.studentId");
  res.json(data);
});

module.exports = router;
