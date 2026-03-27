const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

   if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // 🔥 IMPORTANT FIX
    if (token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // remove "Bearer"
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message); // debug
    return res.status(401).json({ message: "Invalid token" });
  }
};


module.exports = authMiddleware;