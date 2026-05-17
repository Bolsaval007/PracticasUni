const supabase = require('../config/supabase');

/**
 * Crear nueva práctica
 */
const createPractica = async (req, res) => {
  try {
    const { descripcion, fecha_inicio, fecha_fin, id_empresa } = req.body;
    
    // Validar fechas
    const inicio = new Date(fecha_inicio);
    const fin = new Date(fecha_fin);
    
    if (fin <= inicio) {
      return res.status(400).json({ 
        error: 'La fecha de fin debe ser posterior a la fecha de inicio' 
      });
    }
    
    // Crear práctica
    const { data, error } = await supabase
      .from('practica')
      .insert([{
        id_estudiante: req.user.userId,
        descripcion,
        fecha_inicio,
        fecha_fin,
        estado: 'pendiente',
        fecha_solicitud: new Date()
      }])
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json({
      message: 'Práctica creada exitosamente',
      data
    });
  } catch (error) {
    console.error('Create practica error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener práctica por ID
 */
const getPractica = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('practica')
      .select(`
        *,
        tutor_academico(*),
        tutor_empresarial(*),
        seguimiento(*),
        evaluacion(*),
        documento(*)
      `)
      .eq('id_practica', id)
      .eq('id_estudiante', req.user.userId)
      .single();
    
    if (error || !data) {
      return res.status(404).json({ error: 'Práctica no encontrada' });
    }
    
    res.status(200).json({
      message: 'Práctica obtenida',
      data
    });
  } catch (error) {
    console.error('Get practica error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Actualizar práctica
 */
const updatePractica = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, fecha_inicio, fecha_fin, estado } = req.body;
    
    // Verificar que la práctica pertenece al estudiante
    const { data: practica } = await supabase
      .from('practica')
      .select('id_estudiante')
      .eq('id_practica', id)
      .single();
    
    if (!practica || practica.id_estudiante !== req.user.userId) {
      return res.status(403).json({ error: 'No autorizado para actualizar esta práctica' });
    }
    
    const { data, error } = await supabase
      .from('practica')
      .update({
        descripcion: descripcion || undefined,
        fecha_inicio: fecha_inicio || undefined,
        fecha_fin: fecha_fin || undefined,
        estado: estado || undefined
      })
      .eq('id_practica', id)
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({
      message: 'Práctica actualizada exitosamente',
      data
    });
  } catch (error) {
    console.error('Update practica error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Agregar seguimiento a una práctica
 */
const addSeguimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, avance } = req.body;
    
    // Verificar que la práctica pertenece al estudiante
    const { data: practica } = await supabase
      .from('practica')
      .select('id_estudiante')
      .eq('id_practica', id)
      .single();
    
    if (!practica || practica.id_estudiante !== req.user.userId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    
    const { data, error } = await supabase
      .from('seguimiento')
      .insert([{
        id_practica: id,
        descripcion,
        avance,
        fecha: new Date()
      }])
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json({
      message: 'Seguimiento agregado exitosamente',
      data
    });
  } catch (error) {
    console.error('Add seguimiento error:', error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener seguimientos de una práctica
 */
const getSeguimientos = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar que la práctica pertenece al estudiante
    const { data: practica } = await supabase
      .from('practica')
      .select('id_estudiante')
      .eq('id_practica', id)
      .single();
    
    if (!practica || practica.id_estudiante !== req.user.userId) {
      return res.status(403).json({ error: 'No autorizado' });
    }
    
    const { data, error } = await supabase
      .from('seguimiento')
      .select('*')
      .eq('id_practica', id)
      .order('fecha', { ascending: false });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({
      message: 'Seguimientos obtenidos',
      count: data.length,
      data
    });
  } catch (error) {
    console.error('Get seguimientos error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPractica,
  getPractica,
  updatePractica,
  addSeguimiento,
  getSeguimientos
};
