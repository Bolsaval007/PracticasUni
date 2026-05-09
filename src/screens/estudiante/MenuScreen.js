import { View, Text, StyleSheet } from 'react-native';

export default function MenuScreen() {
  return (
    <View style={s.c}>
      <Text style={s.t}>Menú</Text>
      <Text style={s.sub}>Aquí irá el menú del estudiantelol</Text>
    </View>
  );
}
const s = StyleSheet.create({
  c: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff' },
  t: { fontSize:22, fontWeight:'700', color:'#424242' },
  sub: { fontSize:14, color:'#999', marginTop:6 }
});