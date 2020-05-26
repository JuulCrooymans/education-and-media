const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// Get user
router.get('/api/user/:id', userController.getUser);

module.exports = router;