// ── UNIVERSIDAD ──────────────────────────────────────────
export const universidadModel = {
  id_universidad: '',   // ID auto Firestore
  nombre: '',
  direccion: '',
  telefono: '',
  correo: '',
};

// ── EMPRESA ──────────────────────────────────────────────
export const empresaModel = {
  id_empresa: '',
  nombre: '',
  direccion: '',
  telefono: '',
  correo: '',
  sector: '',
};

// ── ESTUDIANTE ───────────────────────────────────────────
export const estudianteModel = {
  id_estudiante: '',    // = uid de Firebase Auth
  nombre: '',
  apellido: '',
  documento: '',
  correo: '',
  telefono: '',
  carrera: '',
  semestre: 1,
  estado_practica: 'sin_practica', // sin_practica | pendiente | aprobada | rechazada | en_curso | finalizada
  id_universidad: '',
  rol: 'estudiante',
  fechaRegistro: null,
};

// ── TUTOR ACADÉMICO ──────────────────────────────────────
export const tutorAcademicoModel = {
  id_tutor_academico: '',
  nombre: '',
  apellido: '',
  correo: '',
  telefono: '',
  facultad: '',
  id_universidad: '',
  rol: 'coordinador',
};

// ── TUTOR EMPRESARIAL ────────────────────────────────────
export const tutorEmpresarialModel = {
  id_tutor_empresarial: '',
  nombre: '',
  apellido: '',
  cargo: '',
  correo: '',
  telefono: '',
  id_empresa: '',
};

// ── PRACTICA ─────────────────────────────────────────────
export const practicaModel = {
  id_practica: '',
  fecha_inicio: null,
  fecha_fin: null,
  estado: 'pendiente',  // pendiente | aprobada | rechazada | en_curso | finalizada
  descripcion: '',
  id_estudiante: '',
  id_tutor_academico: '',
  id_tutor_empresarial: '',
  id_empresa: '',
  fechaSolicitud: null,
  motivoRechazo: '',
};

// ── SEGUIMIENTO ──────────────────────────────────────────
export const seguimientoModel = {
  id_seguimiento: '',
  fecha: null,
  descripcion: '',
  avance: '',           // bajo | medio | alto
  id_practica: '',
};

// ── EVALUACION ───────────────────────────────────────────
export const evaluacionModel = {
  id_evaluacion: '',
  fecha: null,
  calificacion: 0.0,
  observaciones: '',
  id_practica: '',
};

// ── DOCUMENTO ────────────────────────────────────────────
export const documentoModel = {
  id_documento: '',
  nombre: '',
  tipo: '',             // carta_presentacion | seguro | contrato | informe_final
  url: '',              // URL en Firebase Storage
  estado: 'pendiente',  // pendiente | aprobado | rechazado
  id_practica: '',
  fechaSubida: null,
};