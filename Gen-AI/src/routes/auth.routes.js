const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
*/
router.post('/register', authController.userRegisterController)

/**
 * @route POST /api/auth/login
 * @description Login a  user via email and password
 * @access Public
*/
router.post('/login', authController.userLoginController)

/**
 * @route GET /api/auth/logout
 * @description Logout a  user via token blacklisting
 * @access Public
*/
router.get('/logout', authController.userLogoutController)




module.exports = router;