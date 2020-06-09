const express = require('express');
const minorsController = require('../controllers/minors.controller');
const router = express.Router();

// Get user
router.get('/:course/minors/:minor', minorsController.getMinors);

module.exports = router;