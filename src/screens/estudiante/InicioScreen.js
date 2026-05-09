import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Chip, Card, Avatar, Badge } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ofertasMock = [
  {
    id: '1',
    titulo: 'Practicante de Desarrollo Frontend',
    empresa: 'Amazon Web Services',
    logo: '🟠',
    ubicacion: 'Bogotá',
    modalidad: 'Híbrido',
    publicado: 'Hace 2 días',
    destacada: true,
    salario: 'Salario competitivo',
    etiquetas: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: '2',
    titulo: 'Práctica en Marketing Digital',
    empresa: 'Rappi Colombia',
    logo: '🟠',
    ubicacion: 'Medellín',
    modalidad: 'Presencial',
    publicado: 'Hace 5 días',
    destacada: false,
    salario: '$1,200,000 - $1,500,000',
    etiquetas: ['Redes Sociales', 'SEO', 'Analytics'],
  },
  {
    id: '3',
    titulo: 'Pasantía en Data Science',
    empresa: 'Banco de Bogotá',
    logo: '🔵',
    ubicacion: 'Bogotá',
    modalidad: 'Remoto',
    publicado: 'Hace 1 semana',
    destacada: true,
    salario: '$1,800,000',
    etiquetas: ['Python', 'SQL', 'Machine Learning'],
  },
];

export default function InicioScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState(false);

  return (
    <View style={styles.container}>
  <StatusBar style="dark" />

  <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.scroll}
  >
    {/* Header */}
    <View style={styles.header}>
      <Image
        source={require('../../../assets/Component2.png')}
        style={styles.logoImage}
      />
    </View>
        {/* Buscador */}
        <View style={styles.searchSection}>
          <Text style={styles.searchLabel}>Busca ofertas de...</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Puesto, empresa o palabra clave"
              value={busqueda}
              onChangeText={setBusqueda}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Contador y filtro */}
        <View style={styles.resultHeader}>
          <Text style={styles.resultCount}>
            <Text style={styles.resultNumber}>248</Text> ofertas de{' '}
            <Text style={styles.resultCategory}>Prácticas universitarias</Text>
          </Text>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setFiltroActivo(!filtroActivo)}
          >
            <Ionicons name="options" size={18} color="#3DAB7B" />
            <Text style={styles.filterText}>Filtrar (1)</Text>
          </TouchableOpacity>
        </View>

        {/* Ordenar */}
        <View style={styles.sortRow}>
          <Ionicons name="swap-vertical" size={16} color="#999" />
          <Text style={styles.sortLabel}>Ordenar por:</Text>
          <TouchableOpacity>
            <Text style={styles.sortValue}>Fecha de publicación ▼</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de ofertas */}
        {ofertasMock.map((oferta) => (
          <TouchableOpacity
            key={oferta.id}
            style={styles.ofertaCard}
            activeOpacity={0.7}
          >
            {/* Badge destacada */}
            {oferta.destacada && (
              <View style={styles.destacadaBadge}>
                <Text style={styles.destacadaText}>Destacada</Text>
              </View>
            )}

            {/* Header de la card */}
            <View style={styles.ofertaHeader}>
              <View style={styles.empresaLogo}>
                <Text style={styles.empresaEmoji}>{oferta.logo}</Text>
              </View>
              <View style={styles.ofertaInfo}>
                <Text style={styles.ofertaTitulo} numberOfLines={2}>
                  {oferta.titulo}
                </Text>
                <Text style={styles.ofertaEmpresa}>{oferta.empresa}</Text>
              </View>
              <TouchableOpacity style={styles.saveBtn}>
                <Ionicons name="bookmark-outline" size={22} color="#999" />
              </TouchableOpacity>
            </View>

            {/* Detalles */}
            <View style={styles.ofertaDetalles}>
              <View style={styles.detalleItem}>
                <Ionicons name="location-outline" size={14} color="#666" />
                <Text style={styles.detalleText}>{oferta.ubicacion}</Text>
              </View>
              <View style={styles.detalleItem}>
                <Ionicons name="briefcase-outline" size={14} color="#666" />
                <Text style={styles.detalleText}>{oferta.modalidad}</Text>
              </View>
              <View style={styles.detalleItem}>
                <Ionicons name="time-outline" size={14} color="#666" />
                <Text style={styles.detalleText}>{oferta.publicado}</Text>
              </View>
            </View>

            {/* Etiquetas */}
            <View style={styles.etiquetasRow}>
              {oferta.etiquetas.slice(0, 3).map((tag, idx) => (
                <View key={idx} style={styles.etiqueta}>
                  <Text style={styles.etiquetaText}>{tag}</Text>
                </View>
              ))}
            </View>

            {/* Salario */}
            <Text style={styles.salario}>{oferta.salario}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>

      {/* Botón flotante de alerta */}
      {/* <TouchableOpacity style={styles.alertBtn}>
        <Ionicons name="notifications" size={20} color="#FFFFFF" />
        <Text style={styles.alertText}>Activar alerta</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0EB',
  },
  scroll: {
    paddingBottom: 100,
  },

  /* HEADER */
header: {
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 5,   // espacio superior
  paddingBottom: 0, // espacio inferior
  marginBottom: -15,
},

logoImage: {
  width: 130,
  height: 130,
  resizeMode: 'contain',
},

  /* BUSCADOR */
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  searchLabel: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 12,
    fontWeight: '500',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F0EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },

  /* RESULT HEADER */
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  resultCount: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  resultNumber: {
    fontWeight: '700',
    color: '#1A1A1A',
    fontSize: 14,
  },
  resultCategory: {
    color: '#3DAB7B',
    fontWeight: '500',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#3DAB7B',
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    fontSize: 13,
    color: '#3DAB7B',
    fontWeight: '600',
  },

  /* SORT */
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 6,
  },
  sortLabel: {
    fontSize: 12,
    color: '#999',
  },
  sortValue: {
    fontSize: 12,
    color: '#1A1A1A',
    fontWeight: '500',
  },

  /* OFERTA CARD */
  ofertaCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#E8E4E0',
  },
  destacadaBadge: {
    position: 'absolute',
    top: 130,
    right: 12,
    backgroundColor: '#3DAB7B',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 1,
  },
  destacadaText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ofertaHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  empresaLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F0EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  empresaEmoji: {
    fontSize: 24,
  },
  ofertaInfo: {
    flex: 1,
  },
  ofertaTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
    lineHeight: 20,
  },
  ofertaEmpresa: {
    fontSize: 13,
    color: '#3DAB7B',
    fontWeight: '500',
  },
  saveBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* DETALLES */
  ofertaDetalles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  detalleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detalleText: {
    fontSize: 12,
    color: '#666',
  },

  /* ETIQUETAS */
  etiquetasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  etiqueta: {
    backgroundColor: '#F5F0EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  etiquetaText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },

  /* SALARIO */
  salario: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '600',
  },

  /* ALERT BTN */
  /* alertBtn: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#3DAB7B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  alertText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  }, */
});