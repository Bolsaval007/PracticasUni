const { validationResult, body, param, query } = require('express-validator');

/**
 * Middleware para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Errores de validación',
      details: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

/**
 * Validadores de registro
 */
const validateRegister = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
  body('apellido').trim().notEmpty().withMessage('El apellido es requerido'),
  body('carrera').trim().notEmpty().withMessage('La carrera es requerida'),
  body('universidad').notEmpty().withMessage('La universidad es requerida'),
  handleValidationErrors
];

/**
 * Validadores de login
 */
const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  handleValidationErrors
];

/**
 * Validadores de práctica
 */
const validatePractica = [
  body('descripcion').trim().notEmpty().withMessage('La descripción es requerida'),
  body('fecha_inicio').isISO8601().withMessage('Fecha de inicio inválida'),
  body('fecha_fin').isISO8601().withMessage('Fecha de fin inválida'),
  handleValidationErrors
];

/**
 * Validadores para ID UUID
 */
const validateUUID = [
  param('id').isUUID().withMessage('ID inválido'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validatePractica,
  validateUUID,
  handleValidationErrors
};
