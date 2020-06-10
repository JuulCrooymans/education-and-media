const express = require('express');
const projectsController = require('../../controllers/courses/projects.controller');
const router = express.Router();

// ---- get an unique project ----
router.get('/:course/minors/:minor/projects/:project', projectsController.getProject);

// ---- get all projects in a minor ----
router.get('/:course/minors/:minor/projects', projectsController.getProjects);

module.exports = router;