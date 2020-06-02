const express = require('express');
const newUserController = require('../controllers/newUser.controller');
const router = express.Router();

// Get user
router.post('/', newUserController.setNewUser);

module.exports = router;