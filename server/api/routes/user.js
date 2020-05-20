const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();

// Get user
router.get('/', userController.getUserAppMetadata);

module.exports = router;