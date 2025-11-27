import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Institution = sequelize.define('Institution', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
}, {
    tableName: 'institutions',
    timestamps: true
});

export default Institution;
