const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Route
router.post('/register', async (req, res) => {
  console.log("📩 POST /api/auth/register hit");

  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    console.log("✅ User registered successfully");
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  console.log("📩 POST /api/auth/login hit");

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("⚠️ User not found");
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Invalid credentials");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', {
      expiresIn: '7d'
    });

    console.log("✅ Login successful");
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;

const verifyToken = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.role} with ID ${req.user.id}`,
    user: req.user
  });
});

module.exports = router;
