"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bcrypt = require('bcryptjs');
var joi = require('joi');
var cors = require('cors');
var app = express();
var port = 3000;
// Mock database
var MEMORY_DB = {
    admin: {
        email: 'admin@example.com',
        type: 'admin',
        salt: '$2a$10$6BhnrSJxvHOJWPT0R3mK3O',
        passwordhash: '$2a$10$6BhnrSJxvHOJWPT0R3mK3O.H9HSwMhJ5k.tUWTxaGKxHQGP5zTqeO', // Password: Admin123!
    },
};
// Utility functions
function getUserByUsername(username) {
    return MEMORY_DB[username];
}
function getUserByEmail(email) {
    return Object.values(MEMORY_DB).find(function (user) { return user.email === email; });
}
// Joi validation schema
var userSchema = joi.object({
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
        'string.pattern.base': 'Password must contain upper and lower case letters and at least one special character',
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
app.post('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, type, password, value, salt, passwordhash, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, email = _a.email, type = _a.type, password = _a.password;
                return [4 /*yield*/, userSchema.validateAsync({ username: username, email: email, type: type, password: password })];
            case 1:
                value = _b.sent();
                // Check if username or email exists
                if (getUserByUsername(value.username)) {
                    return [2 /*return*/, res.status(409).json({ success: false, message: 'Username already exists' })];
                }
                if (getUserByEmail(value.email)) {
                    return [2 /*return*/, res.status(409).json({ success: false, message: 'Email already exists' })];
                }
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(value.password, salt)];
            case 3:
                passwordhash = _b.sent();
                console.log("\n        --------------------------------------\n        |        New User Registration      |\n        --------------------------------------\n        | Username:  \"".concat(value.username, "\" \n        | Email:      \"").concat(value.email, "\"      \n        | Type:      \"").concat(value.type, "\"        \n        | Password:   \"**********\"      \n        --------------------------------------\n        "));
                // Store user in memory database
                MEMORY_DB[value.username] = {
                    email: value.email,
                    type: value.type,
                    salt: salt,
                    passwordhash: passwordhash,
                };
                return [2 /*return*/, res.status(201).json({ success: true, message: 'User  registered successfully' })];
            case 4:
                error_1 = _b.sent();
                console.error('Error:', error_1.message);
                if (error_1.isJoi) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: error_1.details[0].message })];
                }
                return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Register user - Using GET
app.get('/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, type, password, value, salt, passwordhash, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.query, username = _a.username, email = _a.email, type = _a.type, password = _a.password;
                return [4 /*yield*/, userSchema.validateAsync({
                        username: username,
                        email: email,
                        type: type,
                        password: password,
                    })];
            case 1:
                value = _b.sent();
                if (getUserByUsername(value.username)) {
                    return [2 /*return*/, res.status(409).json({ success: false, message: 'Username already exists' })];
                }
                if (getUserByEmail(value.email)) {
                    return [2 /*return*/, res.status(409).json({ success: false, message: 'Email already exists' })];
                }
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt.hash(value.password, salt)];
            case 3:
                passwordhash = _b.sent();
                console.log("\n        --------------------------------------\n        |        New User Registration      |\n        --------------------------------------\n        | Username:  \"".concat(value.username, "\"\n        | Email:     \"").concat(value.email, "\"\n        | Type:      \"").concat(value.type, "\"\n        | Password:  \"").concat(passwordhash, "\"\n        --------------------------------------\n        "));
                MEMORY_DB[value.username] = {
                    email: value.email,
                    type: value.type,
                    salt: salt,
                    passwordhash: passwordhash,
                };
                return [2 /*return*/, res.status(201).json({ success: true, message: 'User  registered successfully' })];
            case 4:
                error_2 = _b.sent();
                console.error('Error:', error_2.message);
                if (error_2.isJoi) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: error_2.details[0].message })];
                }
                return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Login user
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, usernameRegex, passwordRegex, user, isValid, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                username = username.trim();
                password = password.trim();
                usernameRegex = /^[a-zA-Z0-9_-]+$/;
                passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/;
                // Validate username length and format
                if (!username || username.length < 3) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Invalid username. It must be at least 3 characters long.',
                        })];
                }
                if (!usernameRegex.test(username)) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Invalid username format.',
                        })];
                }
                user = getUserByUsername(username);
                if (!user) {
                    return [2 /*return*/, res.status(401).json({ success: false, message: 'Invalid credentials' })];
                }
                // Validate password length and format
                if (!password || password.length < 5) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Invalid password. It must be at least 5 characters long.',
                        })];
                }
                if (!passwordRegex.test(password)) {
                    return [2 /*return*/, res.status(400).json({
                            success: false,
                            message: 'Invalid password format. It must include at least one uppercase letter, one lowercase letter, and one special character.',
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bcrypt.compare(password, user.passwordhash)];
            case 2:
                isValid = _b.sent();
                if (!isValid) {
                    return [2 /*return*/, res.status(401).json({ success: false, message: 'Invalid credentials' })];
                }
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        message: 'Login successful',
                        user: {
                            username: username,
                            email: user.email,
                            type: user.type,
                        },
                    })];
            case 3:
                error_3 = _b.sent();
                return [2 /*return*/, res.status(500).json({ success: false, message: 'Internal server error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Get all users
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        try {
            users = Object.entries(MEMORY_DB).map(function (_a) {
                var username = _a[0], user = _a[1];
                return ({
                    username: username,
                    email: user.email,
                    type: user.type
                    // Note: We don't include password hash and salt for security
                });
            });
            // Return formatted response
            return [2 /*return*/, res.status(200).json({
                    success: true,
                    count: users.length,
                    data: users
                })];
        }
        catch (error) {
            console.error('Error:', error.message);
            return [2 /*return*/, res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                })];
        }
        return [2 /*return*/];
    });
}); });
// Improved server message
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
