// server.js
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const morgan = require('morgan')
const { router: authRoutes } = require("./routes/authRoutes")
const classRoutes = require("./routes/classRoutes")
const sessionRoutes = require("./routes/sessionRoutes")
const studentRoutes = require("./routes/studentRoutes")

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('dev'))

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/classes", classRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api/students", studentRoutes)

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server running on port ${port}`))
