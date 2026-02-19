const { Sequelize } = require('sequelize');
const pg = require('pg');
require('dotenv').config();

if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME || !process.env.DB_PASSWORD) {
    throw new Error('Missing required database environment variables (DB_HOST, DB_USER, DB_NAME, DB_PASSWORD).');
}

const sequelize = new Sequelize(
    process.env.DB_NAME.trim(),
    process.env.DB_USER.trim(),
    process.env.DB_PASSWORD.trim(),
    {
        host: process.env.DB_HOST.trim(),
        port: process.env.DB_PORT,
        dialect: 'postgres',
        dialectModule: pg,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    }
);

module.exports = sequelize;
