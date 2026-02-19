const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

router.get('/', async (req, res) => {
    console.log('[Health] Check requested');
    const results = {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        database: {
            connected: false,
            host: process.env.DB_HOST ? 'Defined' : 'Missing',
            name: process.env.DB_NAME ? 'Defined' : 'Missing',
            user: process.env.DB_USER ? 'Defined' : 'Missing',
            ssl: 'Unknown' // Will try to infer from connection
        },
        envVars: {
            PORT: process.env.PORT,
            JWT_SECRET: process.env.JWT_SECRET ? '***' : 'Missing'
        }
    };

    try {
        await sequelize.authenticate();
        results.database.connected = true;
        results.database.ssl = sequelize.options.dialectOptions?.ssl ? 'Enabled' : 'Disabled';
        console.log('[Health] DB Connection Success');
        res.status(200).json(results);
    } catch (error) {
        console.error('[Health] DB Connection Failed:', error);
        results.database.error = error.message;
        res.status(503).json(results);
    }
});

module.exports = router;
