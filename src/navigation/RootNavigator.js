import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import EstudianteNavigator from './EstudianteNavigator';

export default function RootNavigator() {
  const { user, rol, cargando } = useAuth();

  if (cargando) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" color="#3DAB7B" />
      </View>
    );
  }

  if (!user) return <AuthNavigator />;
  if (rol === 'estudiante') return <EstudianteNavigator />;

  
  return <AuthNavigator />;
}