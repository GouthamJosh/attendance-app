const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date: { type: String, unique: true },
  records: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      },
      status: String
    }
  ]
});

module.exports =
  mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);
