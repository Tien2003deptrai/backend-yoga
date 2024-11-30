// routes/authRoutes.js
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/user")
const router = express.Router()

// Đăng ký user
router.post("/register", async (req, res) => {
  const { username, password } = req.body
  const userExists = await User.findOne({ username })

  if (userExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const user = new User({ username, password })
  await user.save()
  res.status(201).json({ message: "User registered" })
})

// Đăng nhập user
router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (!user || !(await user.matchPassword(password))) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )
  res.json({ token })
})

// Middleware xác thực token
const protect = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "Not authorized" })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Not authorized" })
    req.user = decoded
    next()
  })
}

router.get("/profile", protect, async (req, res) => {
  try {
    // Tìm người dùng theo ID đã xác thực trong token
    const user = await User.findById(req.user.userId).select("-password"); // Không trả về mật khẩu
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile", error: err });
  }
});

module.exports = { router, protect }
