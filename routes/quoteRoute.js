"use strict";
const quoteController = require('../controllers/quoteController');
const express = require("express");
const router = express.Router();

router.get("/", quoteController.fetchRandomQuote);

module.exports = router;