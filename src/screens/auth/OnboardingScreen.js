import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Component2 from "../../../assets/Component2.png";
import lol from "../../../assets/lol.png";

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} bounces={false} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />

      {/* ── SECCIÓN SUPERIOR — fondo salmón ── */}
      <View style={styles.topSection}>

        {/* Logo */}
        <View style={styles.logoRow}>
          <Image
            source={Component2}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          Plataforma que conecta talento estudiantil con oportunidades reales,
          simplificando la gestión de prácticas empresariales.
        </Text>

        {/* Botón flecha */}
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>

        {/* Ilustración — reemplaza con tu imagen 3D */}
        <View style={styles.illustrationContainer}>
          <Image
            source={lol}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

      </View>

      {/* ── SECCIÓN INFERIOR — fondo blanco ── */}
      <View style={styles.bottomSection}>

        <Text style={styles.tagline}>Todo en un solo lugar</Text>
        <Text style={styles.sectionTitle}>¿Qué te ofrecemos?</Text>

        {/* Cards de características */}
        <View style={styles.cardsRow}>

          <View style={[styles.featureCard, { backgroundColor: '#4CAF84' }]}>
            <Text style={styles.cardIcon}>📄</Text>
            <Text style={styles.cardLabel}>Gestión de prácticas</Text>
          </View>

          <View style={[styles.featureCard, { backgroundColor: '#E8547A' }]}>
            <Text style={styles.cardIcon}>🔗</Text>
            <Text style={styles.cardLabel}>Conexión estudiantes y empresas</Text>
          </View>

          <View style={[styles.featureCard, { backgroundColor: '#5B8DEF' }]}>
            <Text style={styles.cardIcon}>📊</Text>
            <Text style={styles.cardLabel}>Seguimiento y evaluación</Text>
          </View>

        </View>

        {/* Botones de acceso */}
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnPrimaryText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnSecondaryText}>Crear cuenta</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5A882',
  },

  /* ── TOP ── */
  topSection: {
    backgroundColor: '#F5A882',
    paddingTop: 60,
    paddingHorizontal: 28,
    paddingBottom: 0,
    minHeight: height * 0.58,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: {
    fontSize: 28,
    marginRight: 6,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -1,
  },
  logoImage: {
  width: 180,
  height: 70,
},
  subtitle: {
    fontSize: 14,
    color: '#3A2A20',
    lineHeight: 22,
    maxWidth: '65%',
    marginBottom: 28,
  },
  arrowBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F5C842',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowIcon: {
    fontSize: 22,
    color: '#1A1A1A',
    fontWeight: '700',
  },
  illustrationContainer: {
    alignItems: 'flex-end',
    marginTop: -20,
  },
  illustrationImage: {
  width: 260,
  height: 260,
},

  /* ── BOTTOM ── */
  bottomSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 36,
    paddingHorizontal: 28,
    paddingBottom: 48,
    marginTop: -24,
  },
  tagline: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 28,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 32,
  },
  featureCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 15,
  },

  /* ── BOTONES ── */
  btnPrimary: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  btnSecondary: {
    borderWidth: 1.5,
    borderColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#1A1A1A',
    fontSize: 15,
    fontWeight: '600',
  },
});