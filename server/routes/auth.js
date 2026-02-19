const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Signup Route
router.post('/signup', async (req, res) => {
    console.log('[Signup] Request received');
    try {
        const { name, email, password } = req.body;
        console.log(`[Signup] Attempting to create user: ${email}`);

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log(`[Signup] User already exists: ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        console.log('[Signup] Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        console.log('[Signup] Creating user record...');
        const newUser = await User.create({
            full_name: name,
            email,
            password_hash: passwordHash
        });
        console.log(`[Signup] User created successfully: ID ${newUser.id}`);

        res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, name: newUser.full_name, email: newUser.email } });
    } catch (error) {
        console.error('[Signup] Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    console.log('[Login] Request received');
    try {
        const { email, password } = req.body;
        console.log(`[Login] Attempting login for: ${email}`);

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log(`[Login] User not found: ${email}`);
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log(`[Login] User found: ID ${user.id}, Hash length: ${user.password_hash ? user.password_hash.length : 'N/A'}`);

        // Validate password
        console.log('[Login] Comparing passwords...');
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log(`[Login] Password match result: ${isMatch}`);

        if (!isMatch) {
            console.log('[Login] Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('[Login] Login successful');
        res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.full_name, email: user.email } });
    } catch (error) {
        console.error('[Login] Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
