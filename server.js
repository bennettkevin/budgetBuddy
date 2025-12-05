"use strict";
const express = require("express");
const path = require('path');
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'budgetBuddy-frontend/dist')));

require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
require('./auth/passport');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


const cors = require('cors');
app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL, 
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);


const userRoutes = require('./routes/userRoutes');
const quoteRoutes = require('./routes/quoteRoute');
const budgetRoutes = require('./routes/budgetRoutes');
const authRoutes = require('./auth/authRoute');

app.use('/api/users', userRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/auth', authRoutes);

app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'budgetBuddy-frontend/dist', 'index.html'));
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
}); 