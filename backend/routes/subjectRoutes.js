const express = require("express");
const router = express.Router();

const { getSubjects } = require("../controllers/subjectController");

router.get("/:department/:semester", getSubjects);

module.exports = router;