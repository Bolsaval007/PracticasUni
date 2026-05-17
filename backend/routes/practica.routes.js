const express = require('express');
const router = express.Router();
const practicaController = require('../controllers/practica.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { validatePractica, validateUUID } = require('../middleware/validation.middleware');

// Todos los endpoints requieren autenticación
router.use(verifyToken);

/**
 * POST /api/practica
 * Crear nueva práctica
 */
router.post('/', validatePractica, practicaController.createPractica);

/**
 * GET /api/practica/:id
 * Obtener detalles de una práctica
 */
router.get('/:id', validateUUID, practicaController.getPractica);

/**
 * PUT /api/practica/:id
 * Actualizar una práctica
 */
router.put('/:id', validateUUID, practicaController.updatePractica);

/**
 * POST /api/practica/:id/seguimiento
 * Agregar seguimiento a una práctica
 */
router.post('/:id/seguimiento', validateUUID, practicaController.addSeguimiento);

/**
 * GET /api/practica/:id/seguimiento
 * Obtener seguimientos de una práctica
 */
router.get('/:id/seguimiento', validateUUID, practicaController.getSeguimientos);

module.exports = router;
