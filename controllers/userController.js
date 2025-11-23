"use strict";
const model = require('../models/userModel');

/**
 * Function to get the user by their ID.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
async function fetchUserById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const user = await model.getUserById(id);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }   
}


module.exports = {
    fetchUserById
};