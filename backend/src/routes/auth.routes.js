const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
*/
router.post('/register', authController.userRegisterController)

/**
 * @route POST /api/auth/login
 * @description Login a  user via email and password
 * @access public
*/
router.post('/login', authController.userLoginController)

/**
 * @route GET /api/auth/logout
 * @description Logout a  user via token blacklisting
 * @access public
*/
router.get('/logout', authController.userLogoutController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
*/

router.get('/get-me',authMiddleware.authUserMiddleware, authController.getMeController)



module.exports = router;