import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Serverless-optimized configuration
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    // Optimized for serverless - single connection per function instance
    pool: {
      max: isProduction ? 1 : 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // SSL configuration for cloud databases (PlanetScale, etc)
    dialectOptions: isProduction ? {
      ssl: {
        rejectUnauthorized: true
      }
    } : {}
  }
);

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established successfully.');
  } catch (error) {
    console.error('✗ Unable to connect to the database:', error.message);
  }
};

export { sequelize, testConnection };
