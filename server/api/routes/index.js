const express = require('express');
const router = express.Router();

// ---- auth0 check JWT ----
const checkJwt = require('../middleware/auth');

// ---- user routes ----
const currentUser = require('./user/currentUser');
const user = require('./user/user');
const newUser = require('./user/newUser');
const userFeedback = require('./user/userFeedback');
const users = require('./user/users');

router.use('/api/user', checkJwt, user);
router.use('/api/newuser', newUser);
router.use('/api/users', checkJwt, users);
router.use('/api/userfeedback', checkJwt, userFeedback);
router.use('/api/currentUser', checkJwt, currentUser);

// ---- course routes ----
const projects = require('./courses/projects');
const minors = require('./courses/minors');
const courses = require('./courses/courses');

router.use('/api/courses', checkJwt, courses);
router.use('/api/courses', checkJwt, projects);
router.use('/api/courses', checkJwt, minors);

module.exports = router;