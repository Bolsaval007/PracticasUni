# Backend - Emprax
Sistema de Gestión de Prácticas Universitarias - API REST

## 🚀 Instalación Rápida

### 1. Requisitos
- Node.js v14+ 
- npm o yarn
- Cuenta Supabase

### 2. Configuración

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env
cp .env.example .env

# 3. Llenar variables de ambiente
# Editar .env con tus credenciales de Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your-supabase-key
JWT_SECRET=tu-secret-key-aqui
```

### 3. Ejecutar el servidor

```bash
# Desarrollo (con auto-reload)
npm run dev

# Producción
npm start
```

**El servidor estará en:** `http://localhost:3000`

---

## 📋 Estructura del Proyecto

```
backend/
├── config/              # Configuraciones
│   └── supabase.js     # Cliente Supabase
├── controllers/         # Lógica de negocio
│   ├── auth.controller.js
│   ├── estudiante.controller.js
│   └── practica.controller.js
├── middleware/          # Middlewares personalizados
│   ├── auth.middleware.js     # Verificación JWT
│   └── validation.middleware.js
├── routes/              # Definición de rutas
│   ├── auth.routes.js
│   ├── estudiante.routes.js
│   └── practica.routes.js
├── utils/               # Utilidades
│   └── jwt.js          # Funciones JWT
├── server.js            # Punto de entrada
├── .env.example         # Variables de ejemplo
└── POSTMAN_EXAMPLES.md  # Ejemplos de pruebas
```

---

## 🔐 Seguridad Implementada

✅ **CORS:** Restringido al dominio del frontend  
✅ **Helmet:** Headers de seguridad HTTP  
✅ **JWT:** Autenticación por tokens  
✅ **Validación:** Datos validados con express-validator  
✅ **Autorización:** Verificación de roles y permisos  
✅ **SQL Injection:** Proteción mediante Supabase ORM  

---

## 📚 Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verificar token
- `POST /api/auth/logout` - Logout

### Estudiante
- `GET /api/estudiante/profile` - Obtener perfil
- `PUT /api/estudiante/profile` - Actualizar perfil
- `GET /api/estudiante/practicas` - Listar prácticas
- `GET /api/estudiante/stats` - Estadísticas

### Prácticas
- `POST /api/practica` - Crear práctica
- `GET /api/practica/{id}` - Obtener detalles
- `PUT /api/practica/{id}` - Actualizar práctica
- `POST /api/practica/{id}/seguimiento` - Agregar seguimiento
- `GET /api/practica/{id}/seguimiento` - Listar seguimientos

---

## 🧪 Pruebas en Postman

**Guía completa:** Ver [POSTMAN_EXAMPLES.md](./POSTMAN_EXAMPLES.md)

### Ejemplo rápido:

1. **Registrar usuario:**
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "nombre": "Juan",
  "apellido": "Pérez",
  "carrera": "Ingeniería",
  "universidad": "uuid-universidad"
}
```

2. **Copiar el token** de la respuesta

3. **Usar el token** en requests posteriores:
```
GET http://localhost:3000/api/estudiante/profile
Authorization: Bearer {token-aqui}
```

---

## 🔧 Variables de Ambiente

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your-supabase-key

# JWT
JWT_SECRET=tu-secret-super-seguro-cambia-esto
JWT_EXPIRE=7d

# Server
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:8081
```

---

## 🌐 CORS Configurado

```
Origin permitido: http://localhost:8081 (frontend Expo)
Métodos: GET, POST, PUT, DELETE, PATCH
Headers: Content-Type, Authorization
```

Para cambiar el dominio permitido, edita el archivo `server.js`:

```javascript
cors({
  origin: 'tu-nuevo-dominio.com',
  credentials: true,
  ...
})
```

---

## 🛡️ Patrón de Autenticación

1. **Registro/Login** → obtiene **JWT Token**
2. **Todas las requests** → incluyen `Authorization: Bearer {token}`
3. **Middleware** `verifyToken` valida el JWT
4. **Token expira** en 7 días (configurable en `.env`)

---

## 📝 Estructura de Respuestas

### Respuesta exitosa (200/201):
```json
{
  "message": "Descripción",
  "data": { /* datos */ }
}
```

### Respuesta con error (4xx/5xx):
```json
{
  "error": "Descripción del error",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

---

## 🐛 Troubleshooting

### Error: "SUPABASE_URL and SUPABASE_KEY are required"
**Solución:** Verificar que el archivo `.env` existe y está lleno

### Error: "Port 3000 already in use"
**Solución:** Cambiar puerto en `.env`
```env
PORT=3001
```

### Error: "CORS policy"
**Solución:** Verificar que `FRONTEND_URL` en `.env` coincida con tu frontend

---

## 📚 Documentación Adicional

- [Supabase Documentation](https://supabase.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [JWT Authentication](https://jwt.io/)

---

## 📞 Contacto / Soporte

Para problemas o preguntas, contacta al equipo de desarrollo.

---

**Última actualización:** Mayo 17, 2026  
**Versión:** 1.0.0
