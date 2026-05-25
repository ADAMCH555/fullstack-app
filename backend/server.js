require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
// Railway passes the PORT env variable automatically
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/users", require("./routes/userRoutes"));

// Root route health-check (helps verify the backend is alive)
app.get("/", (req, res) => {
    res.json({ message: "Backend API is running successfully!" });
});

// Start Server - '0.0.0.0' is perfect for Railway binding
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});