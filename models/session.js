const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  sessionDate: { type: Date, required: true },
  instructorName: { type: String, required: true },
  additionalNotes: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Session", sessionSchema)
