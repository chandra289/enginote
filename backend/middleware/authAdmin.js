module.exports = function (req, res, next) {

  if (!req.user) {
    return res.status(401).json({ message: "No user found" });
  }

  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};