"use strict";
const budgetController = require('../controllers/budgetController');
const express = require('express');
const router = express.Router();

router.get("/:id", budgetController.fetchUserBudget);
router.post("/", budgetController.postBudgetItem);

module.exports = router;