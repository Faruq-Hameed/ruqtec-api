// cors.js
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Create custom error middleware for handling CORS errors
function handleCorsError(err, req, res, next) {
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({ error: 'Forbidden: This origin is not allowed.' });
  } else {
    next(err);
  }
}

module.exports = {
  corsMiddleware: cors(corsOptions),
  handleCorsError,
};
