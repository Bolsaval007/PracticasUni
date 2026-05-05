import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../supabase.config';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [rol, setRol] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Verificar sesion activa al iniciar
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        cargarPerfil(session.user.id);
      } else {
        setCargando(false);
      }
    });

    // Escuchar cambios de sesion
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          await cargarPerfil(session.user.id);
        } else {
          setUser(null);
          setPerfil(null);
          setRol(null);
          setCargando(false);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const cargarPerfil = async (uid) => {
    try {
      const { data, error } = await supabase
        .from('estudiante')
        .select('*')
        .eq('id_estudiante', uid)
        .single();

      if (data) {
        setPerfil(data);
        setRol(data.rol);
      }
    } catch (e) {
      console.log('Error cargando perfil:', e.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, perfil, rol, cargando, setPerfil }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);