const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const protected = require('../middleware/protected');
router.post('/signup', authController.register)

router.post('/login', authController.login)

router.post('/profile', protected, authController.profile)

module.exports = router;