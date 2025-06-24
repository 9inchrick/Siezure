// models/User.js
//
// This file defines the User schema and model for the application.
// It includes fields for username, email, and password, along with timestamps.
// A pre-save hook ensures passwords are hashed securely before being stored.

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema with necessary validations
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
  },
  { timestamps: true }
);

// Pre-save hook: Hash the password if it has been modified or is new
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to compare candidate passwords with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);