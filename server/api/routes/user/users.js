const express = require('express');
const userController = require('../../controllers/user/users.controller');
const router = express.Router();

// Get user
router.get('/', userController.getUsers);

module.exports = router;