const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model("Teacher", TeacherSchema);
