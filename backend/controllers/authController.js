const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to shape user data
const getUserPayload = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  dob: user.dob,
});

// SIGNUP
exports.signup = async (req, res) => {
  const { email, password, username, dob } = req.body;

  if (!email || !password || !username || !dob) {
    return res.status(400).json({ msg: "All fields (email, password, username, dob) are required." });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ msg: "The provided email is already in use. Please use a different email." });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ msg: "The provided username is already taken. Please choose a different username." });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashed, dob });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ msg: "User account created successfully.", user: getUserPayload(user), token });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "An error occurred while creating the user account. Please try again later." });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Both username and password are required for login." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ msg: "Invalid username or password." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Invalid username or password." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ msg: "Login successful.", token, user: getUserPayload(user) });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ msg: "An error occurred while logging in. Please try again later." });
  }
};
