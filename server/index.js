const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


// Database Connection & Server Start
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Sync models (create tables if not exist)
        await sequelize.sync();
        console.log('Models synced...');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

if (require.main === module) {
    startServer();
}

module.exports = app;
