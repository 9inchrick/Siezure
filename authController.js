// controllers/authController.js
//
// This file handles authentication logic for the app. It provides functions
// for registering a new user and logging in an existing user.
// It uses bcrypt to hash passwords and jsonwebtoken to issue JWT tokens.

const User = require('../models/User'); // Ensure you have a User model defined
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Register Controller - Creates a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation for required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Please provide username, email, and password.',
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'User already exists with that email.',
      });
    }

    // Hash the password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Remove the password field before sending the response
    const { password: pwd, ...userData } = newUser.toObject();

    return res.status(201).json({
      message: 'User registered successfully',
      user: userData,
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Login Controller - Authenticates a user and issues a JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate that both email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: 'Please provide both email and password.',
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a payload for the JWT (excluding sensitive info)
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    // Sign the JWT token with our secret key and set an expiration time
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};