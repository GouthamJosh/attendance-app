const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  className: String,
  division: String,
  semester: String
});

module.exports =
  mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
