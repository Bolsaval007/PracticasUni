const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudiante.controller');
const { verifyToken, verifyRole } = require('../middleware/auth.middleware');

// Todos los endpoints requieren autenticación y rol de estudiante
router.use(verifyToken);

/**
 * GET /api/estudiante/profile
 * Obtener perfil del estudiante
 */
router.get('/profile', estudianteController.getProfile);

/**
 * PUT /api/estudiante/profile
 * Actualizar perfil del estudiante
 */
router.put('/profile', estudianteController.updateProfile);

/**
 * GET /api/estudiante/practicas
 * Obtener todas las prácticas del estudiante
 */
router.get('/practicas', estudianteController.getPracticas);

/**
 * GET /api/estudiante/stats
 * Obtener estadísticas del estudiante
 */
router.get('/stats', estudianteController.getStats);

module.exports = router;
