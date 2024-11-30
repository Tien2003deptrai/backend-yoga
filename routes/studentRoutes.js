// routes/studentRoutes.js
const express = require("express")
const { protect } = require("./authRoutes")
const Enrollment = require("../models/enrollment")
const router = express.Router()

// Đăng ký lớp học
router.post("/enroll", protect, async (req, res) => {
  if (req.user.role !== "student")
    return res.status(403).json({ message: "Access denied" })

  const { sessionId } = req.body
  const enrollment = new Enrollment({ studentId: req.user.userId, sessionId })
  await enrollment.save()
  res.status(201).json({ message: "Enrollment successful" })
})

// Liệt kê các lớp học đã đăng ký
router.get("/enrollments", protect, async (req, res) => {
  const enrollments = await Enrollment.find({
    studentId: req.user.userId,
  }).populate("sessionId")
  res.json(enrollments)
})

module.exports = router
