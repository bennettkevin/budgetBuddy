"use strict";
const budgetController = require('../controllers/budgetController');
const express = require('express');
const router = express.Router();

router.get("/:id", budgetController.fetchUserBudget);
router.get("/item/:itemId", budgetController.fetchBudgetItemById);
router.post("/", budgetController.postBudgetItem);
router.put("/item/:itemId", budgetController.putBudgetItem);
router.delete("/:id", budgetController.deleteBudgetItem);

module.exports = router;