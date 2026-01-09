const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

module.exports =
  mongoose.models.Teacher ||
  mongoose.model("Teacher", TeacherSchema);
