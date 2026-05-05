import { View, Text, StyleSheet } from 'react-native';
export default function ForgotPasswordScreen() {
  return (
    <View style={s.c}>
      <Text style={s.t}>Recuperar Contraseña</Text>
    </View>
  );
}
const s = StyleSheet.create({
  c: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  t: { fontSize:18, fontWeight:'600', color:'#1D9E75' }
});