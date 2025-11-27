import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Criterion = sequelize.define('Criterion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    maxScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
            min: 1,
            max: 100
        }
    },
    weight: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 1.00,
        validate: {
            min: 0.01,
            max: 5.00
        }
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'criteria',
    timestamps: true
});

export default Criterion;
