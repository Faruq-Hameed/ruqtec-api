const express = require('express');
const router = express.Router();
const { register,notifyAdmin, getUsers, sendBulkEmails } = require('../controllers/authControllers');
const {User} = require('../db');
// Registration route
router.post('/register', register, notifyAdmin);
router.get('/register',getUsers);
router.post('/emails', sendBulkEmails)
router.post('/', (req, res)=>{
    console.log(req.body);
    res.status(200).json({success: 'success'});
})
module.exports = router;
