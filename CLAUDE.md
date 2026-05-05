CLAUDE.md - Emprax: Sistema de Gestión de Prácticas Universitarias
1. Project Overview
Emprax es una plataforma móvil multiplataforma que conecta talento estudiantil con oportunidades reales de prácticas empresariales, simplificando la gestión integral del proceso.
Objetivo Principal
Digitalizar y automatizar el ciclo completo de prácticas profesionales universitarias: desde la solicitud del estudiante, pasando por la asignación de tutores y empresas, hasta el seguimiento, evaluación y generación de reportes.
Problema que Resuelve

Gestión manual y fragmentada de prácticas universitarias
Falta de visibilidad del estado de solicitudes para estudiantes
Dificultad en el seguimiento y evaluación por parte de coordinadores
Ausencia de centralización de documentos y reportes

Flujo General
Onboarding → Login/Registro → Dashboard por Rol
                                    ↓
                    ┌───────────────┼───────────────┐
                    ↓               ↓               ↓
              Estudiante      Coordinador      Administrador
                  ↓               ↓               ↓
         Solicitar práctica  Aprobar/Rechazar  Gestionar empresas
         Ver postulaciones   Asignar tutores   Crear universidades
         Subir documentos    Evaluar           Administrar usuarios
         Ver estado          Reportes          Métricas globales

2. Tech Stack
Frontend

Framework: React Native
Runtime: Expo (SDK compatible con la versión instalada)
Lenguaje: JavaScript (ES6+)
UI Framework: React Native Paper + componentes custom
Navegación: React Navigation v6 (Stack + Bottom Tabs)

Backend & Base de Datos

BaaS: Supabase
Base de Datos: PostgreSQL (a través de Supabase)
Autenticación: Supabase Auth (email/password)
Storage: Supabase Storage (documentos PDF, imágenes)

Librerías Principales
json{
  "@react-navigation/native": "navegación principal",
  "@react-navigation/stack": "navegación por stack",
  "@react-navigation/bottom-tabs": "tabs inferiores",
  "@supabase/supabase-js": "cliente de Supabase",
  "react-native-paper": "componentes Material Design",
  "@react-native-async-storage/async-storage": "persistencia de sesión",
  "react-native-url-polyfill": "polyfill para Supabase",
  "expo-status-bar": "barra de estado",
  "expo-document-picker": "selección de documentos",
  "expo-image-picker": "selección de imágenes",
  "expo-file-system": "manejo de archivos",
  "expo-sharing": "compartir archivos",
  "expo-print": "generación de PDFs"
}
APIs Externas

Supabase API (REST/PostgreSQL)
Supabase Auth API
Supabase Storage API


3. Project Structure
PracticasUni/
├── src/
│   ├── screens/              # Pantallas por módulo
│   │   ├── auth/            # Login, Register, Onboarding, ForgotPassword
│   │   ├── estudiante/      # Dashboard, Procesos, Menu
│   │   ├── coordinador/     # Pendiente
│   │   └── admin/           # Pendiente
│   ├── navigation/          # Configuración de navegación
│   │   ├── RootNavigator.js        # Navegador raíz (detecta rol)
│   │   ├── AuthNavigator.js        # Stack de autenticación
│   │   └── EstudianteNavigator.js  # Tabs del estudiante
│   ├── context/             # Contextos de React
│   │   └── AuthContext.js   # Estado global de autenticación
│   ├── models/              # Modelos de datos (structures)
│   │   └── index.js         # Todos los modelos del ERD
│   ├── services/            # Lógica de negocio y llamadas a Supabase
│   ├── components/          # Componentes reutilizables
│   ├── hooks/               # Custom hooks
│   └── utils/               # Utilidades y helpers
├── supabase.config.js       # Configuración del cliente Supabase
├── App.js                   # Punto de entrada
├── app.json                 # Configuración de Expo
├── package.json             # Dependencias
└── babel.config.js          # Configuración de Babel
Módulos Importantes
supabase.config.js: Cliente configurado de Supabase con AsyncStorage para persistencia de sesión.
src/context/AuthContext.js: Provider que gestiona el estado de autenticación global (user, perfil, rol, loading).
src/navigation/RootNavigator.js: Enrutador principal que decide qué navegador mostrar según el rol del usuario autenticado.
src/models/index.js: Definiciones de estructura de datos basadas en el ERD (estudiante, practica, empresa, seguimiento, evaluacion, documento, etc.).

4. Main Modules
Autenticación (Auth)

Pantallas: OnboardingScreen, LoginScreen, RegisterScreen, ForgotPasswordScreen
Flow: Supabase Auth con email/password
Persistencia: AsyncStorage a través de Supabase client
Estado global: AuthContext escucha cambios de sesión con onAuthStateChange

Login Flow:
javascriptsupabase.auth.signInWithPassword({ email, password })
→ AuthContext detecta cambio
→ Carga perfil de tabla 'estudiante'
→ RootNavigator redirige según rol
Register Flow:
javascriptsupabase.auth.signUp({ email, password })
→ Crear registro en tabla 'estudiante' con user.id
→ AuthContext detecta usuario
→ Redirige al dashboard
Roles de Usuario

estudiante: Accede a EstudianteNavigator (Inicio, Procesos, Menú)
coordinador: Accede a CoordinadorNavigator (pendiente)
admin: Accede a AdminNavigator (pendiente)

Detección de rol: Se hace consultando la tabla correspondiente (estudiante, tutor_academico, etc.) con el UID de Supabase Auth.
Dashboard Estudiante (DashboardScreen)

Saludo personalizado
Sección "Postulaciones": cards horizontales de empresas postuladas
Sección "Entrevistas": card con detalles de próxima entrevista (fecha, entrevistador, plataforma)
Diseño visual basado en mockup de Figma proporcionado

Navegación

AuthNavigator: Stack navigation para pantallas de auth
EstudianteNavigator: Bottom tabs con 3 secciones

Tab 1: Inicio (DashboardScreen)
Tab 2: Procesos (ProcesosScreen - placeholder)
Tab 3: Menú (MenuScreen - placeholder)


Tab bar personalizado con fondo negro (#1A1A1A) y emojis como iconos


5. Important Decisions Taken
Firebase → Supabase
Decisión: Migrar de Firebase a Supabase antes de iniciar desarrollo real.
Razones:

Supabase es 100% gratuito sin límites de 30 días
PostgreSQL permite usar el modelo relacional existente sin adaptaciones
Mayor flexibilidad con SQL queries directas
No requiere configuraciones de reglas complejas inicialmente

Android Studio/Kotlin → React Native/Expo
Decisión: Cambiar de desarrollo nativo Android a multiplataforma con React Native.
Razones:

Desarrollo más rápido con hot reload
Compatibilidad iOS y Android con un solo código
Expo Go permite probar en dispositivo real sin compilar
Ecosistema de librerías más accesible
No requiere Android Studio para desarrollo

SecureStore → AsyncStorage
Decisión: Usar AsyncStorage en vez de SecureStore para persistencia de sesión de Supabase.
Razones:

Incompatibilidad de API de SecureStore con Supabase client en Expo
AsyncStorage es suficientemente seguro para tokens de sesión
Simplifica la configuración y evita errores de runtime

Diseño Visual Basado en Figma
Decisión: Implementar diseños exactos de mockups proporcionados en lugar de usar templates.
Razones:

Identidad visual definida con colores específicos
UX pensada para el caso de uso específico
Profesionalismo en la presentación universitaria


6. Errors Already Solved
Error: getReactNativePersistence is not a function
Causa: Versión de Firebase incompatible con React Native/Expo.
Solución: Migración completa a Supabase. En Firebase se solucionaba usando getAuth simple en vez de initializeAuth.
Prevención: Verificar compatibilidad de librerías con Expo antes de instalar.

Error: Cannot find module '../screens/estudiante/ProcesosScreen'
Causa: Navegador importa archivos que no existen aún.
Solución: Crear archivos placeholder para ProcesosScreen y MenuScreen.
Prevención: Crear archivos placeholder antes de agregarlos al navegador.

Error: relation "universidad" does not exist
Causa: SQL de creación de tablas no ejecutado en Supabase.
Solución: Ir a SQL Editor en Supabase y ejecutar el script completo de creación de tablas.
Prevención: Documentar paso de creación de tablas como prerequisito en setup.

Error: ReferenceError: ñ is not defined
Causa: Caracteres especiales fuera de strings al copiar/pegar código.
Solución: Reemplazar archivo completo evitando caracteres especiales en nombres de variables.
Prevención: Usar nombres de variables en inglés o sin tildes/eñes.

Error: Supabase URL con /rest/v1/
Causa: Copiar URL de endpoint REST en vez de Project URL base.
Solución: Usar solo https://xxxxx.supabase.co sin paths adicionales.
Prevención: Verificar que URL termine en .supabase.co sin trailing paths.

7. Coding Standards
Estructura de Componentes
javascriptimport { ... } from 'react-native';
import { ... } from 'expo-...';
import { supabase } from '../../supabase.config';

export default function ComponentName({ navigation }) {
  const [state, setState] = useState(initialValue);
  
  const handleAction = async () => {
    // lógica
  };
  
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { /* ... */ },
});
Naming Conventions

Archivos: PascalCase para componentes (LoginScreen.js)
Variables de estado: camelCase en español cuando representan UI (correo, contrasena)
Funciones: camelCase con prefijo handle para eventos (handleLogin)
Estilos: camelCase descriptivo (btnAcceder, inputLabel)

Colores del Proyecto
javascriptconst COLORS = {
  primary: '#F5A842',      // Naranja (botones principales)
  success: '#3DAB7B',      // Verde (estados positivos)
  info: '#5B8DEF',         // Azul (links, info)
  danger: '#E8547A',       // Rosa (errores)
  dark: '#1A1A1A',         // Negro (textos, tab bar)
  background: '#F5F0EB',   // Beige claro (fondo)
  cardBg: '#FFFFFF',       // Blanco (cards)
};
Error Handling
javascripttry {
  const { data, error } = await supabase.from('tabla').select();
  if (error) {
    Alert.alert('Error', error.message);
    return;
  }
  // procesar data
} catch (e) {
  Alert.alert('Error', e.message);
}
Estado de Carga
Siempre incluir estado cargando para operaciones async y deshabilitar botones:
javascriptconst [cargando, setCargando] = useState(false);
// ...
<TouchableOpacity disabled={cargando} style={[styles.btn, cargando && styles.btnDisabled]}>

8. Build / Run Commands
Instalación Inicial
bashnpm install
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated expo-status-bar expo-document-picker expo-image-picker expo-file-system expo-sharing expo-print
Desarrollo
bashnpx expo start --clear      # Inicia con caché limpia (recomendado)
npx expo start              # Inicia normal
Abrir en Plataformas
bashnpx expo start
# Luego presionar en terminal:
# w → abrir en web
# a → abrir en Android (requiere emulador)
# i → abrir en iOS (solo en Mac)
Instalar Dependencias Específicas de Expo
bashnpx expo install <paquete>   # Auto-instala versión compatible con Expo SDK
Limpiar Proyecto
bashrm -rf node_modules
npm install
npx expo start --clear

9. Known Issues / Pending Work
Módulos Pendientes

 CoordinadorNavigator: Navegación y pantallas del coordinador
 AdminNavigator: Navegación y pantallas del administrador
 ProcesosScreen: Módulo completo de gestión de prácticas del estudiante
 MenuScreen: Perfil, configuración, cerrar sesión
 ForgotPasswordScreen: Implementación real de recuperación de contraseña

Funcionalidades Pendientes

 Sistema de subida de documentos (Supabase Storage)
 Generación de reportes PDF
 Asignación de tutores académicos y empresariales
 Flujo de aprobación/rechazo de solicitudes
 Sistema de seguimiento con registros periódicos
 Evaluaciones con calificaciones
 Notificaciones push
 Filtros y búsqueda en listas

Mejoras Futuras

 Implementar autenticación social (Google, GitHub)
 Modo offline con sincronización
 Internacionalización (i18n)
 Tests unitarios y de integración
 Animaciones de transición entre pantallas
 Gráficos y estadísticas en dashboards


10. Development Notes
Diseño Visual
Los diseños están basados en mockups específicos de Figma con estética moderna:

Uso de emojis en lugar de iconos para simplicidad
Cards con sombras sutiles (elevation: 3)
Border radius generoso (16-24px)
Paleta de colores cálida con acentos vibrantes

Base de Datos - Modelo Relacional (ERD)
Tablas principales en Supabase:

universidad: instituciones educativas
empresa: empresas que ofrecen prácticas
estudiante: vinculado a auth.users con FK
tutor_academico: supervisores universitarios
tutor_empresarial: supervisores de empresa
practica: registro central con FKs a estudiante y tutores
seguimiento: registros de avance
evaluacion: calificaciones
documento: archivos asociados a prácticas

Primary Keys: Todas las tablas usan UUID generado con gen_random_uuid().
Foreign Keys: Relaciones definidas con references.
Supabase Auth Configuration
Para desarrollo, desactivar confirmación de email:
Supabase Console → Authentication → Settings → 
"Enable email confirmations" → OFF
Esto permite login inmediato después de registro sin verificar correo.
Testing Rápido
Para probar flujos sin crear cuentas reales, crear un usuario de prueba en Supabase:
sql-- Ejecutar en SQL Editor
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
VALUES ('test@emprax.com', crypt('password123', gen_salt('bf')), now());

INSERT INTO estudiante (id_estudiante, correo, rol)
VALUES ((SELECT id FROM auth.users WHERE email='test@emprax.com'), 'test@emprax.com', 'estudiante');

11. Restrictions / Things That Must Not Change
❌ NO Usar Firebase
El proyecto migró a Supabase. No agregar dependencias de Firebase.
✅ Mantener Estructura del ERD
El modelo relacional con 8 tablas es requisito universitario. No modificar estructura sin justificación académica.
✅ Compatibilidad con Expo Go
No agregar dependencias que requieran desarrollo build custom. El proyecto debe correr en Expo Go para testing rápido.
✅ Arquitectura de Roles
Siempre validar rol en AuthContext antes de renderizar navegadores. Un usuario solo debe ver su dashboard correspondiente.
✅ Persistencia de Sesión
Mantener configuración de AsyncStorage en Supabase client para que usuarios no tengan que hacer login cada vez que abren la app.
✅ Naming de Tablas en Supabase
Los nombres de tablas deben coincidir exactamente con el ERD:

estudiante (no estudiantes)
practica (no practicas)
seguimiento (no seguimientos)

✅ Primary Keys como UUID
Todas las PKs son UUID, no integers. Mantener coherencia.
❌ NO Usar localStorage/sessionStorage
En React Native no existen. Usar AsyncStorage para datos locales.
✅ Tab Bar del Estudiante Fijo
3 tabs: Inicio, Procesos, Menú. No agregar más sin rediseño completo de UX.

12. SQL - Creación de Tablas (Reference)
sql-- UNIVERSIDAD
CREATE TABLE universidad (
  id_universidad UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  direccion TEXT,
  telefono TEXT,
  correo TEXT
);

-- EMPRESA
CREATE TABLE empresa (
  id_empresa UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  direccion TEXT,
  telefono TEXT,
  correo TEXT,
  sector TEXT
);

-- ESTUDIANTE (vinculado a auth.users)
CREATE TABLE estudiante (
  id_estudiante UUID PRIMARY KEY REFERENCES auth.users(id),
  nombre TEXT,
  apellido TEXT,
  documento TEXT,
  correo TEXT,
  telefono TEXT,
  carrera TEXT,
  semestre INT,
  estado_practica TEXT DEFAULT 'sin_practica',
  id_universidad UUID REFERENCES universidad(id_universidad),
  rol TEXT DEFAULT 'estudiante',
  fecha_registro TIMESTAMPTZ DEFAULT NOW()
);

-- TUTOR ACADÉMICO
CREATE TABLE tutor_academico (
  id_tutor_academico UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT,
  apellido TEXT,
  correo TEXT,
  telefono TEXT,
  facultad TEXT,
  id_universidad UUID REFERENCES universidad(id_universidad),
  rol TEXT DEFAULT 'coordinador'
);

-- TUTOR EMPRESARIAL
CREATE TABLE tutor_empresarial (
  id_tutor_empresarial UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT,
  apellido TEXT,
  cargo TEXT,
  correo TEXT,
  telefono TEXT,
  id_empresa UUID REFERENCES empresa(id_empresa)
);

-- PRÁCTICA
CREATE TABLE practica (
  id_practica UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha_inicio DATE,
  fecha_fin DATE,
  estado TEXT DEFAULT 'pendiente',
  descripcion TEXT,
  id_estudiante UUID REFERENCES estudiante(id_estudiante),
  id_tutor_academico UUID REFERENCES tutor_academico(id_tutor_academico),
  id_tutor_empresarial UUID REFERENCES tutor_empresarial(id_tutor_empresarial),
  fecha_solicitud TIMESTAMPTZ DEFAULT NOW(),
  motivo_rechazo TEXT
);

-- SEGUIMIENTO
CREATE TABLE seguimiento (
  id_seguimiento UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha DATE DEFAULT CURRENT_DATE,
  descripcion TEXT,
  avance TEXT,
  id_practica UUID REFERENCES practica(id_practica)
);

-- EVALUACIÓN
CREATE TABLE evaluacion (
  id_evaluacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fecha DATE DEFAULT CURRENT_DATE,
  calificacion FLOAT,
  observaciones TEXT,
  id_practica UUID REFERENCES practica(id_practica)
);

-- DOCUMENTO
CREATE TABLE documento (
  id_documento UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT,
  tipo TEXT,
  url TEXT,
  estado TEXT DEFAULT 'pendiente',
  id_practica UUID REFERENCES practica(id_practica),
  fecha_subida TIMESTAMPTZ DEFAULT NOW()
);

Última actualización: Proyecto funcional con autenticación Supabase, navegación por roles, y dashboard de estudiante implementado. Pendientes módulos de coordinador, admin, y funcionalidades de gestión completa de prácticas.