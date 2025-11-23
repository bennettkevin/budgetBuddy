"use strict";
const userController = require('../controllers/userController');
const express = require("express");
const router = express.Router();

router.get("/:id", userController.fetchUserById);
module.exports = router;