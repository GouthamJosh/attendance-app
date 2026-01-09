const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

router.get("/", auth, async (req, res) => {
  res.json(await Student.find());
});

module.exports = router;
