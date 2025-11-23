"use strict";
const model = require('../models/quoteModel');

/**
 * This function acts as the endpoint for fetching a random quote.
 * @param {Object} req The request object for the quote.
 * @param {Object} res The response object for the quote.
 */
async function fetchRandomQuote(req, res) {
    try {
        const quote = await model.getRandomQuote();
        res.json(quote);
    }
    catch(error) {
        console.error(error);
        res.status(500).send("Error getting quote");
    }
}

module.exports = {
    fetchRandomQuote
}