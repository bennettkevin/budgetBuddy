"use strict";

const pool = require('../models/db');

/**
 * This function gets the budget items for a specific user.
 * @param {string} id The id of the user whose budget items we want to get.
 * @returns The budget items that belong to the user.
 */
async function getUserBudget(id) {
    let queryText = "SELECT * FROM budgetitems WHERE owner = $1; ";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function getBudgetItemById(itemId) {
    let queryText = "SELECT * FROM budgetitems WHERE id = $1;";
    const values = [itemId];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

/**
 * This function adds a budget item to the database.
 * @param {string} id The goodlId of the user who owns this item.
 * @param {string} type The type of item being added.
 * @param {string} name The name of the item being added.
 * @param {number} cost The cost associated with this item.
 * @param {string} description A description of the item being added.
 * @returns The newly added budget item.
 */
async function addBudgetItem (id, type, name, cost, description) {
    let queryText = "INSERT INTO budgetitems (owner, type, name, cost, description) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    let values = [id, type, name, cost, description];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function updateBudgetItem (itemId, type, name, cost, description) {
    let queryText = "UPDATE budgetitems SET type = $1, name = $2, cost = $3, description = $4 WHERE id = $5 RETURNING *;";
    let values = [type, name, cost, description, itemId];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteBudgetItem(itemId) {
    let queryText = "DELETE FROM budgetitems WHERE id = $1;";
    let values = [itemId];

    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getUserBudget,
    addBudgetItem,
    deleteBudgetItem,
    getBudgetItemById,
    updateBudgetItem
};