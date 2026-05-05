import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../../supabase.config';

export default function RegisterScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleRegister = async () => {
  if (!correo || !contrasena || !confirmar) return;

  if (contrasena !== confirmar) {
    Alert.alert('Error', 'Las contrasenas no coinciden');
    return;
  }

  setCargando(true);

  const { error } = await supabase.auth.signUp({
    email: correo.trim(),
    password: contrasena,
  });

  if (error) {
    Alert.alert('Error', error.message);
  }

  setCargando(false);
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>🎓</Text>
          <Text style={styles.logoText}>Emprax</Text>
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Text style={styles.orange}>Unete</Text> a nosotros!
          </Text>
          <Text style={styles.cardSubtitle}>
            Crea tu cuenta y empieza tu camino{' '}
            <Text style={styles.green}>profesional</Text>.
          </Text>

          <Text style={styles.inputLabel}>Correo</Text>
          <TextInput
            style={styles.input}
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.inputLabel}>Contrasena</Text>
          <TextInput
            style={styles.input}
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
          />

          <Text style={styles.inputLabel}>Confirmar contrasena</Text>
          <TextInput
            style={[
              styles.input,
              confirmar.length > 0 && contrasena !== confirmar && styles.inputError,
              confirmar.length > 0 && contrasena === confirmar && styles.inputSuccess,
            ]}
            value={confirmar}
            onChangeText={setConfirmar}
            secureTextEntry
          />
          {confirmar.length > 0 && contrasena !== confirmar && (
            <Text style={styles.errorText}>Las contrasenas no coinciden</Text>
          )}
          {confirmar.length > 0 && contrasena === confirmar && (
            <Text style={styles.successText}>Las contrasenas coinciden v</Text>
          )}

          <TouchableOpacity
            style={[styles.btnRegistrar, cargando && styles.btnDisabled]}
            onPress={handleRegister}
            disabled={cargando}
          >
            <Text style={styles.btnRegistrarText}>
              {cargando ? 'Creando cuenta...' : 'registrarse'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>
              Ya tienes cuenta?{' '}
              <Text style={styles.orange}>Inicia sesion</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0EB',
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  /* ── LOGO ── */
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
    marginBottom: 28,
  },
  logoIcon: {
    fontSize: 26,
    marginRight: 6,
  },
  logoText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -1,
  },

  /* ── CARD ── */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  orange: {
    color: '#F5A842',
    fontWeight: '600',
  },
  green: {
    color: '#3DAB7B',
    fontWeight: '600',
  },

  /* ── INPUTS ── */
  inputLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: '#F5F0EB',
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 6,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#E8547A',
    backgroundColor: '#FFF0F3',
  },
  inputSuccess: {
    borderColor: '#3DAB7B',
    backgroundColor: '#F0FBF6',
  },
  errorText: {
    fontSize: 11,
    color: '#E8547A',
    marginBottom: 10,
    marginLeft: 2,
  },
  successText: {
    fontSize: 11,
    color: '#3DAB7B',
    marginBottom: 10,
    marginLeft: 2,
  },

  /* ── OPCIONES ── */
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#F5A842',
    borderColor: '#F5A842',
  },
  checkmark: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '700',
  },
  recordarText: {
    fontSize: 12,
    color: '#888',
  },
  recuperarText: {
    fontSize: 12,
    color: '#5B8DEF',
  },

  /* ── BOTÓN ── */
  btnRegistrar: {
    backgroundColor: '#F5A842',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnRegistrarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  /* ── DIVIDER ── */
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E4E0',
  },
  dividerText: {
    fontSize: 12,
    color: '#AAA',
  },

  /* ── SOCIAL ── */
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 24,
  },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  /* ── LINK LOGIN ── */
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    fontSize: 13,
    color: '#888',
  },
});