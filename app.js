const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./src/routes');

const app = express();

// Middleware
app.use(express.json());
app.use(require('morgan')('dev'));
// Configure CORS
// Define allowed origins from the .env file
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

// Configure CORS middleware
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) =>{
    res.redirect(301, 'https://ruqtec.com/');
})

app.use('/api/auth', authRoutes);

app.use('*', (req, res) =>{
    res.status(404).send('<h1>Invalid API end point</h1>');
})
// Start the server
require('./src/db/').dbServer();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
