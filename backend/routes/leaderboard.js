const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET Top 10 Contributors
router.get("/top-contributors", async (req, res) => {
  try {

    const leaderboard = await Note.aggregate([
      {
        $group: {
          _id: "$uploadedBy",
          totalNotes: { $sum: 1 }
        }
      },
      {
        $sort: { totalNotes: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json(leaderboard);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/department/:department", async (req, res) => {

  try {

    const department = req.params.department.toUpperCase();

    const result = await Note.aggregate([

      {
        $match: { department }
      },

      {
        $group: {
          _id: "$uploadedBy",
          totalNotes: { $sum: 1 }
        }
      },

      {
        $sort: { totalNotes: -1 }
      },

      {
        $limit: 10
      }

    ]);

    res.json(result);

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Error fetching department leaderboard" });

  }

});

module.exports = router;

