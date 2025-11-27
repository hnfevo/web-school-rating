import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Institution from './Institution.js';
import Criterion from './Criterion.js';

const AdminRating = sequelize.define('AdminRating', {
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
    criterionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Criterion,
            key: 'id'
        }
    },
    score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    tableName: 'admin_ratings',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['institutionId', 'criterionId']
        }
    ]
});

export default AdminRating;
