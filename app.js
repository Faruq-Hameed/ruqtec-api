const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./src/routes');
const { corsMiddleware, handleCorsError } = require('./src/utils/cors'); // Adjust the path as needed

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('morgan')('dev'));

// CORS middleware
app.use(cors());

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

// custom CORS error handler
// app.use(handleCorsError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
