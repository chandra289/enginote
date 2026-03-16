const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({

  regulation: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  semester: {
    type: Number,
    required: true
  },

  subjectCode: {
    type: String
  },

  subjectName: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model("Subject", subjectSchema);