const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");          // ✅ ADD THIS
const authAdmin = require("../middleware/authAdmin");

const User = require("../models/User");
const Note = require("../models/Note");


router.get("/users/count", auth, authAdmin, async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/notes/count", auth, authAdmin, async (req, res) => {
  try {
    const count = await Note.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/notes", auth, authAdmin, async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/notes/:id", auth, authAdmin, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;