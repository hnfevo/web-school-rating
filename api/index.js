import app, { initDatabase } from '../backend/server.js';

// Initialize database on cold start
let dbInitialized = false;

export default async function handler(req, res) {
    // Initialize database once per serverless instance
    if (!dbInitialized) {
        await initDatabase();
        dbInitialized = true;
    }

    // Handle the request with Express app
    return app(req, res);
}
