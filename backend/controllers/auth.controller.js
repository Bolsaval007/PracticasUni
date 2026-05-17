const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');

/**
 * Registro de nuevo usuario
 */
const register = async (req, res) => {
  try {
    const { email, password, nombre, apellido, carrera, universidad, documento, telefono, semestre } = req.body;
    
    // Verificar si el usuario ya existe
    const { data: existingUser } = await supabase
      .from('estudiante')
      .select('id_estudiante')
      .eq('correo', email)
      .single();
    
    if (existingUser) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }
    
    // Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });
    
    if (authError) {
      return res.status(400).json({ error: authError.message });
    }
    
    const userId = authData.user.id;
    
    // Crear registro en tabla estudiante
    const { error: dbError } = await supabase
      .from('estudiante')
      .insert([{
        id_estudiante: userId,
        nombre,
        apellido,
        documento,
        correo: email,
        telefono,
        carrera,
        semestre,
        id_universidad: universidad,
        rol: 'estudiante',
        estado_practica: 'sin_practica'
      }]);
    
    if (dbError) {
      if (dbError.message?.includes('duplicate key value violates unique constraint "estudiante_pkey"')) {
        return res.status(400).json({
          error: 'El usuario ya existe en la tabla estudiante. Intenta iniciar sesión en lugar de registrarte de nuevo.'
        });
      }
      // Limpiar usuario de Auth si falla el registro en BD
      await supabase.auth.admin.deleteUser(userId);
      return res.status(400).json({ error: dbError.message });
    }
    
    // Generar JWT
    const token = generateToken(userId, email, 'estudiante');
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: userId,
        email,
        nombre,
        apellido,
        documento,
        telefono,
        carrera,
        semestre,
        rol: 'estudiante'
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Login de usuario
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Autenticar con Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (authError) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Obtener datos del usuario
    const { data: userData, error: userError } = await supabase
      .from('estudiante')
      .select('*')
      .eq('id_estudiante', authData.user.id)
      .single();
    
    if (userError) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Generar JWT
    const token = generateToken(authData.user.id, email, userData.rol);
    
    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: userData.id_estudiante,
        email: userData.correo,
        nombre: userData.nombre,
        apellido: userData.apellido,
        rol: userData.rol,
        carrera: userData.carrera
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Verificar token
 */
const verifyAuth = async (req, res) => {
  try {
    // El token fue verificado por el middleware
    const { data: userData } = await supabase
      .from('estudiante')
      .select('*')
      .eq('id_estudiante', req.user.userId)
      .single();
    
    if (!userData) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.status(200).json({
      message: 'Token válido',
      user: {
        id: userData.id_estudiante,
        email: userData.correo,
        nombre: userData.nombre,
        apellido: userData.apellido,
        rol: userData.rol,
        carrera: userData.carrera
      }
    });
  } catch (error) {
    console.error('Verify auth error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Logout (en el client eliminar el token)
 */
const logout = (req, res) => {
  res.status(200).json({
    message: 'Logout exitoso. Por favor elimina el token en el client.'
  });
};

module.exports = {
  register,
  login,
  verifyAuth,
  logout
};
