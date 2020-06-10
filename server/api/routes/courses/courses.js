const express = require('express');
const courseController = require('../../controllers/courses/courses.controller');
const router = express.Router();

// ---- get unique course ----
router.get('/:course/', courseController.getCourse);

// ---- get all courses ----
router.get('/', courseController.getCourses);

module.exports = router;