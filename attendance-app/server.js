const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/auth", require("./routes/authRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/attendance", require("./routes/attendanceRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
