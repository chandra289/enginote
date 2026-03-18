const express = require("express");
const router = express.Router();
const axios = require("axios");

const Note = require("../models/Note");
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

/* ===============================
   1️⃣ Upload Notes + AI Processing
================================ */

router.post("/upload", auth, upload.array("files", 10), async (req, res) => {

  try {

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const savedNotes = [];

    for (const file of files) {

      const note = new Note({
        title: file.originalname,
        department: req.body.department.toUpperCase(),
        semester: req.body.semester,
        subject: req.body.subject,
        unit: req.body.unit,
        uploadedBy: req.user.name,
        pdfUrl: file.path
      });

      await note.save();

      savedNotes.push(note);
    }

    res.json({
      message: "Files uploaded successfully",
      notes: savedNotes
    });

  } catch (err) {

    console.log("UPLOAD ERROR:", err);

    res.status(500).json({
      message: "Upload failed"
    });

  }

});

/* ===============================
   2️⃣ Department Contribution Chart
================================ */

router.get("/stats/departments", async (req, res) => {

  try {

    const stats = await Note.aggregate([
      {
        $group: {
          _id: { $toUpper: "$department" },
          totalNotes: { $sum: 1 }
        }
      },
      { $sort: { totalNotes: -1 } }
    ]);

    res.json(stats);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error fetching department stats"
    });

  }

});


/* ===============================
   3️⃣ Top Rated Notes
================================ */

router.get("/top-rated", async (req, res) => {

  try {

    const notes = await Note.find();

    const ratedNotes = notes.map(note => {

      const avgRating =
        note.ratings && note.ratings.length > 0
          ? note.ratings.reduce((sum, r) => sum + r.value, 0) /
            note.ratings.length
          : 0;

      return {
        ...note._doc,
        avgRating
      };

    });

    ratedNotes.sort((a, b) => b.avgRating - a.avgRating);

    res.json(ratedNotes.slice(0, 25));

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error fetching top rated notes"
    });

  }

});


router.get("/top-rated/:department", async (req, res) => {

  try {

    const department = req.params.department.toUpperCase();

    const notes = await Note.find({ department });

    const ratedNotes = notes.map(note => {

      const avgRating =
        note.ratings && note.ratings.length > 0
          ? note.ratings.reduce((sum, r) => sum + r.value, 0) /
            note.ratings.length
          : 0;

      return {
        ...note._doc,
        avgRating
      };

    });

    ratedNotes.sort((a, b) => b.avgRating - a.avgRating);

    res.json(ratedNotes.slice(0, 5));

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error fetching department top rated notes"
    });

  }

});


/* ===============================
   4️⃣ Count Notes Per Department
================================ */

router.get("/count/:department", async (req, res) => {

  try {

    const department = decodeURIComponent(req.params.department).toUpperCase();

    const count = await Note.countDocuments({
      department
    });

    res.json({ count });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Error counting notes"
    });

  }

});


/* ===============================
   5️⃣ Rate Notes
================================ */

router.post("/rate/:id", async (req, res) => {

  try {

    const { rating, user } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    const existingRating = note.ratings.find(r => r.user === user);

    if (existingRating) {

      existingRating.value = rating;

    } else {

      note.ratings.push({
        user,
        value: rating
      });

    }

    await note.save();

    res.json({
      message: "Rating saved"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Rating failed"
    });

  }

});

/* ===============================
Get Notes by Department + Semester + Subject + Unit
================================ */

router.get("/:department/:semester/:subject/:unit", async (req, res) => {

  try {

    const department = decodeURIComponent(req.params.department).toUpperCase();
    const subject = decodeURIComponent(req.params.subject);

    const notes = await Note.find({
      department,
      semester: req.params.semester,
      subject,
      unit: req.params.unit
    });

    res.json(notes);

  } catch (err) {

    console.log(err);

    res.status(500).json({ message: "Error fetching unit notes" });

  }

});



/* ===============================
   6️⃣ Get Notes by Department + Semester
================================ */

router.get("/:department/:semester", async (req, res) => {

  try {

    const department = decodeURIComponent(req.params.department).toUpperCase();
    const semester = Number(req.params.semester); // 🔥 important

    const subjects = await Subject.find({
      department,
      semester
    }).sort({ subjectName: 1 }); // optional sorting

    res.json(subjects);

  } catch (err) {

    console.log("ERROR FETCHING SUBJECTS:", err);

    res.status(500).json({
      message: "Error fetching subjects"
    });

  }

});


/* ===============================
   7️⃣ Delete Notes
================================ */

router.delete("/delete/:id", auth, async (req, res) => {

  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    if (note.uploadedBy !== req.user.name) {
      return res.status(403).json({
        message: "You can delete only your notes"
      });
    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Delete failed"
    });

  }

});


module.exports = router;