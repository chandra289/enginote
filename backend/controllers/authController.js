exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    console.log("Request body:", req.body);

    // ✅ check empty fields
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email });

    console.log("User from DB:", user);

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    console.log("User role:", user.role);

    // 🔥 SUPERADMIN CHECK
    if (user.role !== "superadmin") {
      return res.status(403).json({
        message: "Access denied: Superadmin only"
      });
    }

    // ✅ create JWT token (include role)
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role   // 👈 IMPORTANT
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
        role: user.role
      }
    });

  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};