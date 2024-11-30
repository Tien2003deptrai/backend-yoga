const mongoose = require("mongoose")

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  enrollmentDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Enrollment", enrollmentSchema)
