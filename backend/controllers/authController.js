const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// SIGNUP
exports.signup = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      
    });

    await user.save();

    res.json({
      message: "Signup successful"
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Signup failed" });

  }

};


// LOGIN
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // create JWT token
    const token = jwt.sign(

      {
        id: user._id,
        name: user.name,
        email: user.email
      },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }

    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role:user.role
      }
    });

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "Login failed" });

  }

};