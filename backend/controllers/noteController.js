const Note = require("../models/Note");

exports.uploadNote = async (req, res) => {
  try {
    const { title, department, subject, semester, uploadedBy } = req.body;

    const note = await Note.create({
      title,
      department,
      subject,
      semester,
      pdfUrl: req.file.path, // file path stored
      uploadedBy
    });

    res.json(note);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { department } = req.params;

    const notes = await Note.find({ department });

    res.json(notes);
  } catch (err) {
    res.status(500).json(err.message);
  }
};