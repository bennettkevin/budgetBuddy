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

async function fetchBudgetItemById(req, res) {
    const itemId = req.params.itemId;
    if(itemId) {
        try {
            const budgetItem = await model.getBudgetItemById(itemId);
            res.json(budgetItem);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
    else {
        res.status(400).send("Missing required itemId param.");
    }
}

async function putBudgetItem(req, res) {
    const itemId = req.params.itemId;
    const { type, name, cost, description } = req.body;
    if(itemId && type && name && cost) {
        try {
            const updatedItem = await model.updateBudgetItem(itemId, type, name, cost, description);
            res.status(200).json(updatedItem);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
    else {
        res.status(400).send("Missing required fields");
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

async function deleteBudgetItem(req, res) {
    const itemId = req.params.id;
    if(itemId) {
        try {
            const itemDeleted = await model.deleteBudgetItem(itemId);
            res.status(200).json(itemDeleted);
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Server error");
        }
    }
    else {
        res.status(400).send("Missing required itemId param");
    }
}
module.exports = {
    fetchUserBudget,
    postBudgetItem,
    deleteBudgetItem,
    fetchBudgetItemById,
    putBudgetItem
};