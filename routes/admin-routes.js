const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth_middleware')
const adminMiddleware = require('../middleware/admin_middleware')


//adding extra layer of auth
router.get('/welcome', authMiddleware, adminMiddleware,  (req, res) => {
    res.json({
        message: 'Welcome to the Admin Page',
        
    })
})
module.exports = router 