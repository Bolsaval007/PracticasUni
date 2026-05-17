require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const estudianteRoutes = require('./routes/estudiante.routes');
const practicaRoutes = require('./routes/practica.routes');

const app = express();

// Middleware de seguridad
app.use(helmet());

// CORS Configurationa
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/estudiante', estudianteRoutes);
app.use('/api/practica', practicaRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  
  res.status(statusCode).json({
    error: message,
    statusCode: statusCode,
    timestamp: new Date().toISOString()
  });
});

// Server setup
const PORT = process.env.PORT || 3000;

// Configurar HTTPS (opcional)
const setupServer = () => {
  let server;
  
  // Verificar si existen certificados SSL para HTTPS
  const certPath = path.join(__dirname, 'certs');
  const certExists = fs.existsSync(path.join(certPath, 'key.pem')) && 
                     fs.existsSync(path.join(certPath, 'cert.pem'));
  
  if (certExists && process.env.NODE_ENV === 'production') {
    const options = {
      key: fs.readFileSync(path.join(certPath, 'key.pem')),
      cert: fs.readFileSync(path.join(certPath, 'cert.pem'))
    };
    server = https.createServer(options, app);
    console.log('🔒 HTTPS Server iniciado');
  } else {
    server = http.createServer(app);
    console.log('🌐 HTTP Server iniciado (sin SSL)');
  }
  
  server.listen(PORT, () => {
    console.log(`\n✅ Servidor corriendo en puerto ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health\n`);
  });
};

setupServer();

module.exports = app;
