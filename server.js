const express = require('express');
const axios = require('axios');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Initialize Express app
const app = express();

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Set up database connection (PostgreSQL)
const sequelize = new Sequelize(
    process.env.DB_NAME || 'trading_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'pass',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
    }
);

// Define a model for storing ticker data
const Ticker = sequelize.define('Ticker', {
    name: DataTypes.STRING,
    last: DataTypes.STRING,
    buy: DataTypes.STRING,
    sell: DataTypes.STRING,
    volume: DataTypes.STRING,
    base_unit: DataTypes.STRING,
}, { timestamps: false });

// Middleware to parse JSON
app.use(express.json());

// Fetch data from WazirX and store it in the database
const fetchAndStoreData = async () => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;
        const top10Tickers = Object.keys(tickers).slice(0, 10).map(key => tickers[key]);

        // Clear existing data
        await Ticker.destroy({ where: {}, truncate: true });

        // Store new data
        for (const ticker of top10Tickers) {
            await Ticker.create({
                name: ticker.name,
                last: ticker.last,
                buy: ticker.buy,
                sell: ticker.sell,
                volume: ticker.volume,
                base_unit: ticker.base_unit,
            });
        }
        console.log('Tickers data updated successfully.');
    } catch (error) {
        console.error('Error fetching or storing data:', error);
    }
};

// Endpoint to get the stored ticker data
app.get('/api/tickers', async (req, res) => {
    try {
        const tickers = await Ticker.findAll();
        res.json(tickers);
    } catch (error) {
        console.error('Error fetching tickers:', error);
        res.status(500).json({ message: 'Error fetching tickers' });
    }
});

// Serve index.html when accessing root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server and sync the database
app.listen(3000, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');
        await sequelize.sync();
        console.log('Database synced.');
        
        // Fetch and store data immediately
        fetchAndStoreData();

        // Fetch and store data every 1 minute
        setInterval(fetchAndStoreData, 60000);  // 60000 milliseconds = 1 minute
        
        console.log('Server is running on port 3000');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
