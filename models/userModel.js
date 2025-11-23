const pool = require('../models/db');

/**
 * Function to get the user by id.
 * @param {string} googleId The google id of the user. 
 * @returns The user that matches the google id.
 */
async function getUserById(googleId) {
    const queryText = "SELECT * FROM users where googleid= $1";
    const values = [googleId];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

/**
 * Function to create a new user entry in the database.
 * @param {array} param0 This should be an array containing the user details.
 * @returns 
 */
async function createNewUser([googleId, displayName, firstName, lastName, email]) {
    let queryText = "INSERT INTO users ( googleId, displayName, firstName, lastName, email) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    let values = [googleId, displayName, firstName, lastName, email];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}


module.exports = {
    getUserById,
    createNewUser
};