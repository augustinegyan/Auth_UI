const express  = require('express');
const router = express.Router();
const {renderLoginPage, renderSignupPage, registerUser, loginUser} = require('../controllers/auth_controller');

// Routes for rendering login and signup pages
router.get('/login', renderLoginPage);
router.get('/signup', renderSignupPage);

// Routes for handling authentication
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;