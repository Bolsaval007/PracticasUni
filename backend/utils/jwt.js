const jwt = require('jsonwebtoken');

/**
 * Generar JWT token
 */
const generateToken = (userId, email, rol) => {
  return jwt.sign(
    {
      userId,
      email,
      rol
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

/**
 * Verificar JWT token
 */
const verifyTokenUtil = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido: ' + error.message);
  }
};

module.exports = {
  generateToken,
  verifyTokenUtil
};
