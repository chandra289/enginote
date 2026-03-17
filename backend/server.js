require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const leaderboardRoutes = require("./routes/leaderboard");
const aiRoutes = require("./routes/aiRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

/* ================= CORS CONFIG (FIXED) ================= */

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://enginote-jjm8.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// 👇 VERY IMPORTANT (handles preflight requests)
app.options("*", cors());

/* ================= MIDDLEWARE ================= */

app.use(express.json());

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

/* ================= ROUTES ================= */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/admin", adminRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/ai", aiRoutes);

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static("uploads"));

/* ================= HEALTH CHECK ================= */

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ================= SERVE FRONTEND ================= */

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});