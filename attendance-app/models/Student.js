const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  rollNo: String,
  className: String
});

module.exports = mongoose.model("Student", StudentSchema);
