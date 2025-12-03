import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';

dotenv.config();

let db = null;

// Initialize Firebase Admin
const initializeFirebase = async () => {
    try {
        // Check if already initialized
        if (admin.apps.length > 0) {
            db = admin.firestore();
            return db;
        }

        // For local development with service account JSON file
        if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
            const serviceAccountData = await readFile(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8');
            const serviceAccount = JSON.parse(serviceAccountData);

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
        // For Vercel deployment with environment variables
        else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    // Replace escaped newlines in private key
                    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
                })
            });
        } else {
            throw new Error('Firebase credentials not found. Please set environment variables.');
        }

        db = admin.firestore();
        console.log('✓ Firebase initialized successfully');
        return db;
    } catch (error) {
        console.error('✗ Firebase initialization error:', error);
        throw error;
    }
};

// Get Firestore instance
const getFirestore = () => {
    if (!db) {
        throw new Error('Firebase not initialized. Call initializeFirebase() first.');
    }
    return db;
};

// Test connection
const testConnection = async () => {
    try {
        const db = getFirestore();
        // Try to read from a collection (will create if doesn't exist)
        await db.collection('_health_check').limit(1).get();
        console.log('✓ Firestore connection established successfully');
        return true;
    } catch (error) {
        console.error('✗ Unable to connect to Firestore:', error.message);
        return false;
    }
};

export { initializeFirebase, getFirestore, testConnection };
export default admin;
