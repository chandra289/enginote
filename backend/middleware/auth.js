const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    // ❌ No token
    if (!authHeader) {
      return res.status(401).json({
        message: "No token, access denied"
      });
    }

    // ✅ Support: Bearer token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // ✅ VERY IMPORTANT

    next();

  } catch (err) {

    console.log("Auth Error:", err);

    res.status(401).json({
      message: "Invalid token"
    });

  }
};

module.exports = auth;