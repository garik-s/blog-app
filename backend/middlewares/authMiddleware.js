const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET ?? "93645e29a8f13f1da138af0910b74b94d5bf0e60a958c3caab8e5005ce159be5";

exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = decoded;
    next();
  });
};