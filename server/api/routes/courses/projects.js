const express = require('express');
const projectsController = require('../../controllers/courses/projects.controller');
const router = express.Router();

// Get user
router.get('/:course/minors/:minor/projects', projectsController.getProjects);

module.exports = router;