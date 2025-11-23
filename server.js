"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

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

app.use('/users', userRoutes);
app.use('/quote', quoteRoutes);
app.use('/budget', budgetRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});