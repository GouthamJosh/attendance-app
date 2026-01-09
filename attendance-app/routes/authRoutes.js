const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const router = express.Router();

/* REGISTER TEACHER (USE ONCE via Postman) */
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  await new Teacher({
    email: req.body.email,
    password: hashed
  }).save();
  res.json("Teacher Registered");
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const teacher = await Teacher.findOne({ email: req.body.email });
  if (!teacher) return res.status(401).json("Invalid email");

  const valid = await bcrypt.compare(req.body.password, teacher.password);
  if (!valid) return res.status(401).json("Invalid password");

  const token = jwt.sign(
    { id: teacher._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;
