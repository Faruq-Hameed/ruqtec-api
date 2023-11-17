const express = require('express');
const router = express.Router();
const { register,notifyAdmin, getUsers, deleteUsers } = require('../controllers/authControllers');
const {User} = require('../db');
// Registration route
router.post('/register', register, notifyAdmin);
router.get('/register',getUsers);
router.delete('/register',deleteUsers);


module.exports = router;
