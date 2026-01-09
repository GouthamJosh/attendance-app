const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Teacher = require("../models/Teacher");

const router = express.Router();

/* SIGN UP WITH CAPTCHA */
router.post("/register", async (req, res) => {
  const { email, password, captcha } = req.body;

  const exists = await Teacher.findOne({ email });
  if (exists) return res.status(400).json("Teacher already exists");

  const verifyURL =
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captcha}`;

  const captchaRes = await axios.post(verifyURL);
  if (!captchaRes.data.success)
    return res.status(400).json("Captcha verification failed");

  const hashed = await bcrypt.hash(password, 10);
  await new Teacher({ email, password: hashed }).save();

  res.json("Teacher registered successfully");
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email });
  if (!teacher) return res.status(401).json("Teacher not registered");

  const valid = await bcrypt.compare(password, teacher.password);
  if (!valid) return res.status(401).json("Incorrect password");

  const token = jwt.sign(
    { id: teacher._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

module.exports = router;
