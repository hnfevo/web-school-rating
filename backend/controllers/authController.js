import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getFirestore } from '../config/firebase.js';

// Register new admin user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password.'
            });
        }

        const db = getFirestore();

        // Check if user already exists
        const existingUserSnapshot = await db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!existingUserSnapshot.empty) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists.'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const userRef = await db.collection('users').add({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });

        const userDoc = await userRef.get();
        const userId = userDoc.id;

        // Generate token
        const token = jwt.sign(
            { id: userId, email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: {
                user: {
                    id: userId,
                    name,
                    email
                },
                token
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration.'
        });
    }
};

// Login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password.'
            });
        }

        const db = getFirestore();

        // Check if user exists
        const userSnapshot = await db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (userSnapshot.empty) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();
        const userId = userDoc.id;

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: userId, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful.',
            data: {
                user: {
                    id: userId,
                    name: user.name,
                    email: user.email
                },
                token
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login.'
        });
    }
};

// Get current user
export const getCurrentUser = async (req, res) => {
    try {
        const db = getFirestore();
        const userDoc = await db.collection('users').doc(req.user.id).get();

        if (!userDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        const user = userDoc.data();

        res.json({
            success: true,
            data: {
                user: {
                    id: userDoc.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};
