const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authControllers');
const {User} = require('../db');
// Registration route
router.post('/register', register);
router.get('/register', async (req, res)=>{
    const users = await User.find({})
    .sort({ createdAt: -1 })

    res.status(200).json({message: 'succesful', users});
})
router.post('/', (req, res)=>{
    console.log(req.body);
    res.status(200).json({success: 'success'});
})
module.exports = router;
