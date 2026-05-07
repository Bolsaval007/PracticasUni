import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../../supabase.config';
import logoCreator_imagetologo from "../../../assets/logoCreator_imagetologo.png";
import Component2 from "../../../assets/Component2.png";
import { Image } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [recordar, setRecordar] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (!correo || !contrasena) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos');
      return;
    }
    setCargando(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password: contrasena,
      });

      if (error) {
        if (error.message.includes('Invalid login')) {
          Alert.alert('Error', 'Correo o contrasena incorrectos');
        } else {
          Alert.alert('Error', error.message);
        }
      }
      // Si no hay error, AuthContext detecta el cambio y redirige automaticamente
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setCargando(false);
    }
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
        <View style={styles.topLogoContainer}>
          <Image
            source={Component2}
            style={styles.topLogo}
            resizeMode="contain"
          />
        </View>

        {/* CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu futuro empieza aqui</Text>
          <Text style={styles.cardSubtitle}>
            Inicia{' '}
            <Text style={styles.orange}>sesion</Text>
            {' '}y{' '}
            <Text style={styles.blue}>conecta</Text>
            {' '}con nuevas oportunidades.
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

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkRow}
              onPress={() => setRecordar(!recordar)}
            >
              <View style={[styles.checkbox, recordar && styles.checkboxActive]}>
                {recordar && <Text style={styles.checkmark}>v</Text>}
              </View>
              <Text style={styles.recordarText}>Recordarme</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.recuperarText}>Recuperar contrasena?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.btnAcceder, cargando && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={cargando}
          >
            <Text style={styles.btnAccederText}>
              {cargando ? 'Cargando...' : 'acceder'}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o inicia sesion con</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={logoCreator_imagetologo}
              style={styles.loginLogo}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.registerText}>
              No tienes cuenta?{' '}
              <Text style={styles.orange}>Registrate</Text>
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

  /* ── LOGO SUPERIOR ── */
topLogoContainer: {
  alignItems: 'center',
  marginTop: 50, // 🔥 baja el logo superior
  marginBottom: 35,
},

topLogo: {
  width: 180,
  height: 80,
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
  blue: {
    color: '#5B8DEF',
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
    marginBottom: 16,
  },

  /* ── OPCIONES ── */
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  /* ── BOTÓN ACCEDER ── */
  btnAcceder: {
    backgroundColor: '#F5A842',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnAccederText: {
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
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  loginLogo: {
    width: 105,
    height: 105,
  },

  /* ── REGISTRO ── */
  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 13,
    color: '#888',
  },
});

