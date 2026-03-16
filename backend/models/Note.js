const mongoose = require("mongoose");

/* =========================
   Rating Schema
========================= */

const ratingSchema = new mongoose.Schema({
  user: String,
  value: Number
});


/* =========================
   Note Schema
========================= */

const noteSchema = new mongoose.Schema({

  title: String,

  department: {
    type: String,
    required: true
  },

  semester: {
    type: Number,
    required: true
  },

  subject: {
    type: String,
    required: true
  },

  unit: {
    type: Number,
    required: true
  },

  uploadedBy: String,

  pdfUrl: String,

  summary: String,

  flashcards: String,

  ratings: [ratingSchema]

}, { timestamps: true });


module.exports = mongoose.model("Note", noteSchema);