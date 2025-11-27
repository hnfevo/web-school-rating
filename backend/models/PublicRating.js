import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Institution from './Institution.js';

const PublicRating = sequelize.define('PublicRating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    institutionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Institution,
            key: 'id'
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    ipAddress: {
        type: DataTypes.STRING(45),
        allowNull: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'public_ratings',
    timestamps: true
});

export default PublicRating;
