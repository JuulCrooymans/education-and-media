const express = require('express');
const userFeedbackController = require('../../controllers/user/userFeedback.controller');
const router = express.Router();

// Get user
router.get('/:id', userFeedbackController.getUserFeedback);

router.post('/:id', userFeedbackController.postUserFeedback);

router.delete('/:id', userFeedbackController.deleteUserFeedback);

module.exports = router;