import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import { getFirestore } from '../config/firebase.js';
=======
import { User } from '../models/index.js';
>>>>>>> c1fe075 (first)

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

<<<<<<< HEAD
        const db = getFirestore();

        // Check if user already exists
        const existingUserSnapshot = await db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (!existingUserSnapshot.empty) {
=======
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
>>>>>>> c1fe075 (first)
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists.'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
<<<<<<< HEAD
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
=======
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email },
>>>>>>> c1fe075 (first)
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: {
                user: {
<<<<<<< HEAD
                    id: userId,
                    name,
                    email
=======
                    id: user.id,
                    name: user.name,
                    email: user.email
>>>>>>> c1fe075 (first)
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

<<<<<<< HEAD
        const db = getFirestore();

        // Check if user exists
        const userSnapshot = await db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();

        if (userSnapshot.empty) {
=======
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
>>>>>>> c1fe075 (first)
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password.'
            });
        }

<<<<<<< HEAD
        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();
        const userId = userDoc.id;

=======
>>>>>>> c1fe075 (first)
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
<<<<<<< HEAD
            { id: userId, email: user.email },
=======
            { id: user.id, email: user.email },
>>>>>>> c1fe075 (first)
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            success: true,
            message: 'Login successful.',
            data: {
                user: {
<<<<<<< HEAD
                    id: userId,
=======
                    id: user.id,
>>>>>>> c1fe075 (first)
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
<<<<<<< HEAD
        const db = getFirestore();
        const userDoc = await db.collection('users').doc(req.user.id).get();

        if (!userDoc.exists) {
=======
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'createdAt']
        });

        if (!user) {
>>>>>>> c1fe075 (first)
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

<<<<<<< HEAD
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
=======
        res.json({
            success: true,
            data: { user }
>>>>>>> c1fe075 (first)
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error.'
        });
    }
};
