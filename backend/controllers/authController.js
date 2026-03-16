import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Helper to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create and save new user (password hashed via pre-save hook in User model)
        const user = await User.create({ name, email, password });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// @route   POST /api/auth/login
// @desc    Login an existing user
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            message: 'Login successful',
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
