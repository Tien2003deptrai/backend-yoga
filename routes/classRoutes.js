// routes/classRoutes.js
const express = require("express")
const { protect } = require("./authRoutes")
const Class = require("../models/class")
const router = express.Router()

// Thêm lớp học
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" })

  const { className, capacity, duration, price, classType, description } =
    req.body
  const yogaClass = new Class({
    className,
    capacity,
    duration,
    price,
    classType,
    description,
  })
  await yogaClass.save()
  res.status(201).json(yogaClass)
})

// Liệt kê tất cả lớp học
router.get("/", protect, async (req, res) => {
  const yogaClasses = await Class.find()
  res.json(yogaClasses)
})

router.get("/class/:id", protect, async (req, res) => {
  const classId = req.params.id; // Lấy id từ URL params

  try {
    const yogaClass = await Class.findById(classId); // Lấy lớp học dựa trên id

    if (!yogaClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(yogaClass); // Trả về chi tiết lớp học
  } catch (err) {
    res.status(500).json({ message: "Error fetching class details", error: err });
  }
});

module.exports = router
