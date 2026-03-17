const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  department: {
    type: String,
    default: ""   // 👈 prevents crash if missing
  },

  role: {
    type: String,
    enum: ["student", "superadmin"],
    default: "student"
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);