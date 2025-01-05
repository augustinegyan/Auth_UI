const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Render login page
const renderLoginPage = (req, res) => {
    res.render('login');
};

// Render signup page
const renderSignupPage = (req, res) => {
    res.render('signup');
};

// Register 
const registerUser = async (req, res) => {
   try {
    const {username, email, password, role} = req.body;
    const checkExistingUser = await User.findOne({$or: [{username}, {email}]});
    if(checkExistingUser){
        return res.status(400).json({
            success: false,
            message: 'User already exist'
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserCreated = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'user'
    });

    await newUserCreated.save();
    if(newUserCreated){
        return res.status(200).json({
            success: true,
            message: 'User created successfully'
        });
    } else {
        return res.status(400).json({
            success: false,
            message: 'Unable to create User'
        });
    }
   } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Some error occurred Try again '
        });
   }
};

// Login 
const loginUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isPassWordMatch = await bcrypt.compare(password, user.password);
        if(!isPassWordMatch){
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        } 

        const accessToken = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role 
            }, process.env.JWT_SECRET_KEY, {expiresIn: '15m'}
        );

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            accessToken
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Some error occurred Try again '
        });
    }
};

module.exports = {renderLoginPage, renderSignupPage, loginUser, registerUser};