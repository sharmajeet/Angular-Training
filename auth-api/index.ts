const express = require('express');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const cors = require('cors');
const app = express();
const port = 3000;

import { Request, Response } from 'express';

// Interfaces
interface UserDto {
  username: string;
  email: string;
  type: 'user' | 'admin';
  password: string;
}

interface UserEntry {
  email: string;
  type: 'user' | 'admin';
  salt: string;
  passwordhash: string;
}

// Mock database
const MEMORY_DB: Record<string, UserEntry> = {
  admin: {
    email: 'admin@example.com',
    type: 'admin',
    salt: '$2a$10$6BhnrSJxvHOJWPT0R3mK3O',
    passwordhash:
      '$2a$10$6BhnrSJxvHOJWPT0R3mK3O.H9HSwMhJ5k.tUWTxaGKxHQGP5zTqeO', // Password: Admin123!
  },
};

// Utility functions
function getUserByUsername(username: string): UserEntry | undefined {
  return MEMORY_DB[username];
}

function getUserByEmail(email: string): UserEntry | undefined {
  return Object.values(MEMORY_DB).find((user) => user.email === email);
}

// Joi validation schema
const userSchema = joi.object({
  username: joi
    .string()
    .trim() // Removes leading and trailing spaces
    .min(1) // Ensures at least one character remains after trimming
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

// Add CORS middleware before other app.use statements
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Register user
app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, type, password } = req.body;

    // Validate user input
    const value = await userSchema.validateAsync({ username, email, type, password });

    // Check if username or email exists
    if (getUserByUsername(value.username)) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    if (getUserByEmail(value.email)) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(value.password, salt);
    console.log(`
        --------------------------------------
        |        New User Registration      |
        --------------------------------------
        | Username:  "${value.username}"    |
        | Email:      "${value.email}"      |
        | Type:      "${value.type}"        |
        | Password:   "**********"          |
        --------------------------------------
        `);
        
    // Store user in memory database
    MEMORY_DB[value.username] = {
      email: value.email,
      type: value.type,
      salt,
      passwordhash,
    };

    return res.status(201).json({ success: true, message: 'User  registered successfully' });
    
  } catch (error: any) {
    console.error('Error:', error.message);
    if (error.isJoi) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Register user - Using GET
app.get('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, type, password } = req.query;

    const value = await userSchema.validateAsync({
      username,
      email,
      type,
      password,
    });

    if (getUserByUsername(value.username)) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    if (getUserByEmail(value.email)) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(value.password, salt);
    console.log(`
         --------------------------------------
        |        New User Registration      |
        --------------------------------------
        | Username:  "${value.username}"    |
        | Email:      "${value.email}"      |
        | Type:      "${value.type}"        |
        | Password:   "**********"          |
        --------------------------------------
        `);

    MEMORY_DB[value.username] = {
      email: value.email,
      type: value.type,
      salt,
      passwordhash,
    };

    return res.status(201).json({ success: true, message: 'User  registered successfully' });
  } catch (error: any) {
    console.error('Error:', error.message);
    if (error.isJoi) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Login user
app.post('/login', async (req: Request, res: Response) => {
  let { username, password } = req.body;

  username = username.trim();
  password = password.trim();

  // Validation rules
  const usernameRegex = /^[a-zA-Z0-9_-]+$/; // Alphanumeric, underscore, and hyphen
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/; // At least one uppercase, lowercase, and special character

  // Validate username length and format
  if (!username || username.length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Invalid username. It must be at least 3 characters long.',
    });
  }

  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid username format.',
    });
  }

  // Check if user exists
  const user = getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  // Validate password length and format
  if (!password || password.length < 5) {
    return res.status(400).json({
      success: false,
      message: 'Invalid password. It must be at least 5 characters long.',
    });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid password format. It must include at least one uppercase letter, one lowercase letter, and one special character.',
    });
  }

  try {
    // Compare hashed passwords
    const isValid = await bcrypt.compare(password, user.passwordhash);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        username,
        email: user.email,
        type: user.type,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    // Convert MEMORY_DB into array of users with usernames
    const users = Object.entries(MEMORY_DB).map(([username, user]) => ({
      username,
      email: user.email,
      type: user.type
      // Note: We don't include password hash and salt for security
    }));

    // Return formatted response
    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error: any) {
    console.error('Error:', error.message);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

// Improved server message
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

