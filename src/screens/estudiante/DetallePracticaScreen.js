import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function DetallePracticaScreen({ route, navigation }) {
  const { oferta } = route.params;
  const [guardada, setGuardada] = useState(false);

  const handlePostular = () => {
    Alert.alert(
      'Confirmar postulación',
      `¿Deseas postularte a ${oferta.titulo}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Postularme',
          onPress: () => {
            // Aquí irá la lógica de Supabase
            Alert.alert('Éxito', 'Postulación enviada correctamente');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleGuardar = () => {
    setGuardada(!guardada);
    Alert.alert(
      guardada ? 'Eliminada' : 'Guardada',
      guardada
        ? 'Oferta eliminada de favoritos'
        : 'Oferta guardada en favoritos'
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Header con botón atrás */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle de práctica</Text>
        <TouchableOpacity style={styles.saveHeaderBtn} onPress={handleGuardar}>
          <Ionicons
            name={guardada ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={guardada ? '#F5A842' : '#1A1A1A'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Card principal */}
        <View style={styles.mainCard}>
          {/* Logo y título */}
          <View style={styles.empresaHeader}>
            <View style={styles.empresaLogo}>
              <Text style={styles.empresaEmoji}>{oferta.logo}</Text>
            </View>
            <View style={styles.empresaInfo}>
              <Text style={styles.empresaNombre}>{oferta.empresa}</Text>
              <View style={styles.ubicacionRow}>
                <Ionicons name="location" size={14} color="#666" />
                <Text style={styles.ubicacionText}>{oferta.ubicacion}</Text>
              </View>
            </View>
          </View>

          {/* Título de la práctica */}
          <Text style={styles.practicaTitulo}>{oferta.titulo}</Text>

          {/* Badges de info rápida */}
          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Ionicons name="briefcase" size={14} color="#3DAB7B" />
              <Text style={styles.badgeText}>{oferta.modalidad}</Text>
            </View>
            <View style={styles.badge}>
              <Ionicons name="time" size={14} color="#3DAB7B" />
              <Text style={styles.badgeText}>{oferta.publicado}</Text>
            </View>
          </View>
        </View>

        {/* Descripción */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text" size={20} color="#3DAB7B" />
            <Text style={styles.sectionTitle}>Descripción</Text>
          </View>
          <Text style={styles.descriptionText}>
            Buscamos un estudiante apasionado por la tecnología para unirse a
            nuestro equipo de desarrollo. Trabajarás en proyectos reales,
            aprenderás de profesionales experimentados y tendrás la oportunidad
            de crecer en un ambiente dinámico y colaborativo.
            {'\n\n'}
            Esta práctica te permitirá aplicar tus conocimientos académicos en
            casos reales, desarrollar habilidades técnicas y blandas, y
            construir una red profesional valiosa.
          </Text>
        </View>

        {/* Requisitos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={20} color="#3DAB7B" />
            <Text style={styles.sectionTitle}>Requisitos</Text>
          </View>
          <View style={styles.requisitoItem}>
            <Ionicons name="school" size={16} color="#666" />
            <Text style={styles.requisitoText}>
              Carrera: Ingeniería de Sistemas, Informática o afines
            </Text>
          </View>
          <View style={styles.requisitoItem}>
            <Ionicons name="calendar" size={16} color="#666" />
            <Text style={styles.requisitoText}>Semestre mínimo: 5to</Text>
          </View>
          <View style={styles.requisitoItem}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.requisitoText}>
              Disponibilidad: 6 meses (Junio - Diciembre 2026)
            </Text>
          </View>
        </View>

        {/* Habilidades */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash" size={20} color="#3DAB7B" />
            <Text style={styles.sectionTitle}>Habilidades requeridas</Text>
          </View>
          <View style={styles.habilidadesGrid}>
            {oferta.etiquetas.map((hab, idx) => (
              <View key={idx} style={styles.habilidadChip}>
                <Text style={styles.habilidadText}>{hab}</Text>
              </View>
            ))}
            <View style={styles.habilidadChip}>
              <Text style={styles.habilidadText}>Git</Text>
            </View>
            <View style={styles.habilidadChip}>
              <Text style={styles.habilidadText}>Trabajo en equipo</Text>
            </View>
          </View>
        </View>

        {/* Compensación */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cash" size={20} color="#3DAB7B" />
            <Text style={styles.sectionTitle}>Compensación</Text>
          </View>
          <Text style={styles.salarioDetalle}>{oferta.salario}</Text>
          <Text style={styles.salarioSub}>
            + Certificado de práctica profesional
          </Text>
        </View>

        {/* Tutor empresarial */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person" size={20} color="#3DAB7B" />
            <Text style={styles.sectionTitle}>Tutor empresarial</Text>
          </View>
          <View style={styles.tutorCard}>
            <View style={styles.tutorAvatar}>
              <Text style={styles.tutorInitials}>JD</Text>
            </View>
            <View style={styles.tutorInfo}>
              <Text style={styles.tutorNombre}>Juan Pérez</Text>
              <Text style={styles.tutorCargo}>Tech Lead - Engineering</Text>
              <View style={styles.tutorContacto}>
                <Ionicons name="mail" size={12} color="#999" />
                <Text style={styles.tutorContactoText}>
                  juan.perez@amazon.com
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Espacio para botones flotantes */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Botones flotantes */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.btnSecundario}
          onPress={handleGuardar}
        >
          <Ionicons
            name={guardada ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color="#3DAB7B"
          />
          <Text style={styles.btnSecundarioText}>
            {guardada ? 'Guardada' : 'Guardar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimario} onPress={handlePostular}>
          <Ionicons name="send" size={20} color="#FFFFFF" />
          <Text style={styles.btnPrimarioText}>Postularme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0EB',
  },
  scroll: {
    paddingBottom: 20,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E8E4E0',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  saveHeaderBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* MAIN CARD */
  mainCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  empresaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  empresaLogo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#F5F0EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  empresaEmoji: {
    fontSize: 28,
  },
  empresaInfo: {
    flex: 1,
  },
  empresaNombre: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ubicacionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ubicacionText: {
    fontSize: 13,
    color: '#666',
  },
  practicaTitulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 30,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E1F5EE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    color: '#085041',
    fontWeight: '500',
  },

  /* SECCIONES */
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },

  /* REQUISITOS */
  requisitoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  requisitoText: {
    fontSize: 14,
    color: '#555',
    flex: 1,
  },

  /* HABILIDADES */
  habilidadesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  habilidadChip: {
    backgroundColor: '#F5F0EB',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E4E0',
  },
  habilidadText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
  },

  /* SALARIO */
  salarioDetalle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3DAB7B',
    marginBottom: 6,
  },
  salarioSub: {
    fontSize: 13,
    color: '#999',
  },

  /* TUTOR */
  tutorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0EB',
    padding: 14,
    borderRadius: 12,
  },
  tutorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3DAB7B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tutorInitials: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tutorInfo: {
    flex: 1,
  },
  tutorNombre: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  tutorCargo: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  tutorContacto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tutorContactoText: {
    fontSize: 12,
    color: '#999',
  },

  /* BOTTOM BAR */
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E8E4E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },
  btnSecundario: {
    flex: 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#E1F5EE',
    paddingVertical: 16,
    borderRadius: 14,
  },
  btnSecundarioText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3DAB7B',
  },
  btnPrimario: {
    flex: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#3DAB7B',
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#3DAB7B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnPrimarioText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});