"use strict";

const model = require('../models/budgetModel');

/**
 * This function fetches budget items for specified user.
 * @param {Object} req The request object associated with this api call.
 * @param {Object} res The response object associated with this api call.
 */
async function fetchUserBudget(req, res) {
    const id = req.params.id;
    if(id) {
        try {
            const budgetItems = await model.getUserBudget(id);
            res.json(budgetItems);
        } 
        catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
    else {
            res.status(400).send("Missing required id param");
    }
}

/**
 * This function adds a new budget item.
 * @param {Object} req The request object.
 * @param {Object} res The response object.
 */
async function postBudgetItem(req, res) {
    const { owner, type, name, cost, description } = req.body;
    if(owner && type && name && cost) {
        try {
            const newBudgetItem = await model.addBudgetItem(owner, type, name, cost, description);
            res.status(201).json(newBudgetItem);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
    else {
        res.status(400).send("Missing required product fields");
    }
}

module.exports = {
    fetchUserBudget,
    postBudgetItem
};