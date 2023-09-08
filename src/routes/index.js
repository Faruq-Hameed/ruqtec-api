const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authControllers');

// Registration route
router.post('/register', register);

router.post('/', (req, res)=>{
    console.log(req.body);
    res.status(200).json({success: 'success'});
})
module.exports = router;
