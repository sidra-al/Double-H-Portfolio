const express = require('express');
const router = express.Router();

const { login, verifyToken } = require('../controllers/auth.controller');

// ==============================
// Auth Routes
// ==============================

// Login
router.post('/login', login);

// Verify token
router.get('/verify', verifyToken);

module.exports = router;

