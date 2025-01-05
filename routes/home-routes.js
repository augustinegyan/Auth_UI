const express = require('express');
const authmiddleware = require('../middleware/auth_middleware');

const router = express.Router();
router.get('/welcome', authmiddleware, (req,res)=>{
    const {username, userId, role}= req.userInfo;
    res.json({
        message: 'Welcome to the Home Page',
        username:{
            _id: userId,
            username,
            role
        }
    });
});

module.exports = router;