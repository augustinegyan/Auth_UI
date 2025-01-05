require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDb = require('./Databse/db');
const authRoutes = require('./routes/auth-routes');
const homeRoute = require('./routes/home-routes');
const adminRoute = require('./routes/admin-routes');

const app = express(); 

app.use(express.json());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoute);
app.use('/api/admin', adminRoute);
connectDb();

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});