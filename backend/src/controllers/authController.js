const User = require("../models/User");
const Organization = require("../models/Organization");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// ✅ EMAIL VALIDATION
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, orgName } = req.body;

    // ✅ REQUIRED FIELDS
    if (!name || !email || !password || !orgName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // ✅ EMAIL FORMAT
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // ✅ PASSWORD VALIDATION
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // ✅ CHECK EXISTING USER
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // ✅ HASH PASSWORD
    const hashed = await bcrypt.hash(password, 10);

    // ✅ CREATE ORG
    const org = await Organization.create({
      name: orgName
    });

    // ✅ CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashed,
      organizationId: org._id
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      token: generateToken(user)
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ REQUIRED FIELDS
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // ✅ EMAIL VALIDATION
    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // ✅ FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // ✅ PASSWORD MATCH
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user)
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};