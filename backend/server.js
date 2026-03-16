require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const leaderboardRoutes = require("./routes/leaderboard");
const aiRoutes = require("./routes/aiRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const adminRoutes = require("./routes/adminRoutes");




const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.error("MongoDB Connection Error:", err);
});

/* ROUTES */

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/admin", adminRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/ai", aiRoutes);

/* SERVE UPLOADED FILES */

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});