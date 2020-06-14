const express = require('express');
const minorsController = require('../../controllers/courses/minors.controller');
const router = express.Router();

// ---- get an unique minor ----
router.get('/:course/minors/:minor', minorsController.getMinor);

// ---- get all minors in a course ----
router.get('/:course/minors', minorsController.getMinors);

module.exports = router;