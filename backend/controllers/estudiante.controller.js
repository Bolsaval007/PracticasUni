const supabase = require('../config/supabase');

/**
 * Obtener perfil del estudiante
 */
const getProfile = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('estudiante')
      .select('*')
      .eq('id_estudiante', req.user.userId)
      .single();
    
    if (error) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    
    res.status(200).json({
      message: 'Perfil obtenido',
      data
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Actualizar perfil del estudiante
 */
const updateProfile = async (req, res) => {
  try {
    const { nombre, apellido, documento, telefono, carrera, semestre } = req.body;
    
    const { data, error } = await supabase
      .from('estudiante')
      .update({
        nombre: nombre || undefined,
        apellido: apellido || undefined,
        documento: documento || undefined,
        telefono: telefono || undefined,
        carrera: carrera || undefined,
        semestre: semestre || undefined
      })
      .eq('id_estudiante', req.user.userId)
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({
      message: 'Perfil actualizado exitosamente',
      data
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener prácticas del estudiante
 */
const getPracticas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('practica')
      .select(`
        *,
        tutor_academico(*),
        tutor_empresarial(*)
      `)
      .eq('id_estudiante', req.user.userId)
      .order('fecha_solicitud', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({
      message: 'Prácticas obtenidas',
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Get practicas error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener estadísticas del estudiante
 */
const getStats = async (req, res) => {
  try {
    // Total de prácticas
    const { count: totalPracticas } = await supabase
      .from('practica')
      .select('*', { count: 'exact' })
      .eq('id_estudiante', req.user.userId);
    
    // Prácticas completadas
    const { count: completadas } = await supabase
      .from('practica')
      .select('*', { count: 'exact' })
      .eq('id_estudiante', req.user.userId)
      .eq('estado', 'completada');
    
    // Prácticas en progreso
    const { count: enProgreso } = await supabase
      .from('practica')
      .select('*', { count: 'exact' })
      .eq('id_estudiante', req.user.userId)
      .eq('estado', 'en_progreso');
    
    res.status(200).json({
      message: 'Estadísticas obtenidas',
      stats: {
        totalPracticas,
        completadas,
        enProgreso,
        pendientes: totalPracticas - completadas - enProgreso
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getPracticas,
  getStats
};
