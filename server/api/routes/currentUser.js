const express = require('express');
const currentUserController = require('../controllers/currentUser.controller');
const router = express.Router();

// Get user
router.get('/', currentUserController.getUserAppMetadata);

module.exports = router;