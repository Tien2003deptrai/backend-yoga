// routes/sessionRoutes.js
const express = require("express")
const { protect } = require("./authRoutes")
const Session = require("../models/session")
const router = express.Router()

// Thêm phiên lớp học
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" })

  const { classId, sessionDate, instructorName, additionalNotes } = req.body
  const session = new Session({
    classId,
    sessionDate,
    instructorName,
    additionalNotes,
  })
  await session.save()
  res.status(201).json(session)
})

// Liệt kê phiên lớp học của một lớp
router.get("/:classId", protect, async (req, res) => {
  const sessions = await Session.find({ classId: req.params.classId })
  res.json(sessions)
})

module.exports = router
