const express = require('express');
const app = express();
const joi = require('joi');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const User = require('../model/UserModel');

// Middleware to parse JSON request bodies
app.use(express.json());

// Joi validation schema
const userSchema = joi.object({
  username: joi
    .string()
    .trim()
    .min(1)
    .max(24)
    .required()
    .messages({
      'string.empty': 'Username cannot be empty or only spaces',
    }),
  email: joi.string().email().required(),
  type: joi.string().valid('user', 'admin').required(),
  password: joi
    .string()
    .trim()
    .min(5)
    .max(24)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .required()
    .messages({
      'string.empty': 'Password cannot be empty or only spaces',
      'string.pattern.base':
        'Password must contain upper and lower case letters and at least one special character',
    }),
});

// Get all users
async function getAllUser(req, res) {
  try {
    const users = await User.find({}, {
      username: 1,
      email: 1,
      type: 1,
      _id: 0
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}

// Register user
async function createNewUser(req, res) {
    try {
      console.log('Request Body:', req.body); // Debugging line
      const userData = req.body;
  
      if (!userData) {
        return res.status(400).json({ success: false, message: 'Request body is missing' });
      }
  
      const data = {
        username: userData.username,
        email: userData.email,
        type: userData.type,
        password: userData.password,
      };
  
      // Validate user input
      const value = await userSchema.validateAsync(data);
  
      // Check if username or email exists
      const existingUsername = await User.findOne({ username: value.username });
      if (existingUsername) {
        return res.status(409).json({ success: false, message: 'Username already exists' });
      }
  
      const existingEmail = await User.findOne({ email: value.email });
      if (existingEmail) {
        return res.status(409).json({ success: false, message: 'Email already exists' });
      }
  
      // Generate salt and hash password
      const salt = crypto.randomBytes(16).toString('hex');
      const passwordhash = crypto.pbkdf2Sync(value.password, salt, 1000, 64, 'sha512').toString('hex');
  
      // Create new user in MongoDB
      const newUser = new User({
        username: value.username,
        email: value.email,
        type: value.type,
        salt,
        passwordhash,
      });
  
      await newUser.save();

      return res.status(201).json({ success: true, message: 'User registered successfully' });
  
    } catch (error) {
      console.error('Error:', error.message);
      if (error.isJoi) {
        return res.status(400).json({ success: false, message: error.details[0].message });
      }
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

module.exports = {
  getAllUser,
  createNewUser
};