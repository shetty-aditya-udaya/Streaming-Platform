const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = User;
