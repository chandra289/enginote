const Subject = require("../models/Subject");

exports.getSubjects = async (req, res) => {

  try {

    const { department, semester } = req.params;

    const subjects = await Subject.find({
      department,
      semester,
      regulation: "R2023"
    });

    res.json(subjects);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching subjects"
    });

  }

};