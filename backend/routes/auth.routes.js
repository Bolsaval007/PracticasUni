const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middleware/validation.middleware');
const { verifyToken } = require('../middleware/auth.middleware');

/**
 * POST /api/auth/register
 * Registrar nuevo usuario
 */
router.post('/register', validateRegister, authController.register);

/**
 * POST /api/auth/login
 * Login de usuario
 */
router.post('/login', validateLogin, authController.login);

/**
 * GET /api/auth/verify
 * Verificar token y obtener datos del usuario
 */
router.get('/verify', verifyToken, authController.verifyAuth);

/**
 * POST /api/auth/logout
 * Logout del usuario
 */
router.post('/logout', verifyToken, authController.logout);

module.exports = router;
