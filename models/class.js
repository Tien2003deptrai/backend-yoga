const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  capacity: { type: Number, required: true },
  duration: { type: Number, required: true }, // in minutes
  price: { type: Number, required: true },
  classType: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Class", classSchema)
