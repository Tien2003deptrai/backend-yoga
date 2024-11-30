const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import các model
const Class = require("../models/Class");
const User = require("../models/User");
const Session = require("../models/Session");
const Enrollment = require("../models/Enrollment");

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/yoga-studio", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Khởi tạo dữ liệu mẫu
const seedData = async () => {
    try {
        // Xóa tất cả dữ liệu hiện tại
        await Class.deleteMany();
        await User.deleteMany();
        await Session.deleteMany();
        await Enrollment.deleteMany();

        // Tạo các lớp học
        const class1 = await Class.create({
            className: "Math 101",
            capacity: 30,
            duration: 60,  // in minutes
            price: 500,
            classType: "Online",
            description: "Introduction to Mathematics"
        });

        const class2 = await Class.create({
            className: "History 201",
            capacity: 25,
            duration: 90,
            price: 450,
            classType: "In-person",
            description: "World History"
        });

        // Tạo người dùng
        const user1 = await User.create({
            username: "admin",
            password: "admin123", // password sẽ được mã hóa trước khi lưu
            role: "admin"
        });

        const user2 = await User.create({
            username: "student1",
            password: "student123",
            role: "student"
        });

        // Tạo buổi học
        const session1 = await Session.create({
            classId: class1._id,
            sessionDate: new Date("2024-12-01T10:00:00Z"),
            instructorName: "Mr. Smith",
            additionalNotes: "Focus on Algebra"
        });

        const session2 = await Session.create({
            classId: class2._id,
            sessionDate: new Date("2024-12-02T14:00:00Z"),
            instructorName: "Mrs. Johnson",
            additionalNotes: "Introduction to Ancient Civilizations"
        });

        // Tạo đăng ký
        await Enrollment.create({
            studentId: user2._id,
            sessionId: session1._id
        });

        console.log("Seed data has been added successfully!");
        mongoose.disconnect();
    } catch (err) {
        console.error("Error seeding data:", err);
        mongoose.disconnect();
    }
};

// Chạy hàm khởi tạo dữ liệu
seedData();
