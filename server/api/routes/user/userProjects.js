const express = require('express');
const userProjectsController = require('../../controllers/user/userProjects.controller');
const router = express.Router();

// Get user
router.get('/:id', userProjectsController.getUserProjects);

router.get('/', userProjectsController.getProjects);

module.exports = router;