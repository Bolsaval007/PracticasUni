import { View, Text, StyleSheet } from 'react-native';

export default function ProcesosScreen() {
  return (
    <View style={s.c}>
      <Text style={s.t}>Procesos</Text>
      <Text style={s.sub}>Aquí irá el módulo de procesos</Text>
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  t: { fontSize:22, fontWeight:'700', color:'#1A1A1A' },
  sub: { fontSize:14, color:'#999', marginTop:6 }
});