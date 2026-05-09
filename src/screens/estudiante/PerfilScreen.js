import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../supabase.config";
import { useAuth } from "../../context/AuthContext";

export default function PerfilScreen() {
  const { perfil, user, setPerfil } = useAuth();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [carrera, setCarrera] = useState("");
  const [semestre, setSemestre] = useState("");
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    if (perfil) {
      setNombre(perfil.nombre || "");
      setApellido(perfil.apellido || "");
      setDocumento(perfil.documento || "");
      setCorreo(perfil.correo || "");
      setTelefono(perfil.telefono || "");
      setCarrera(perfil.carrera || "");
      setSemestre(perfil.semestre ? String(perfil.semestre) : "");
      setFoto(perfil.foto_url || null);
    }
  }, [perfil]);

  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      Alert.alert(
        "Permiso requerido",
        "Debes permitir acceso a la galería"
      );
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!resultado.canceled) {
      setFoto(resultado.assets[0].uri);
    }
  };

  const guardarPerfil = async () => {
    try {
      console.log("USER ID:", user?.id);

      const datosActualizados = {
        nombre,
        apellido,
        documento,
        correo,
        telefono,
        carrera,
        semestre: semestre ? Number(semestre) : null,
      };

      const { data, error } = await supabase
        .from("estudiante")
        .update(datosActualizados)
        .eq("id_estudiante", user.id)
        .select()
        .single();

      if (error) {
        console.log("ERROR SUPABASE:", error);
        throw error;
      }

      console.log("DATA ACTUALIZADA:", data);
      setPerfil(data);

      Alert.alert("Éxito", "Perfil actualizado correctamente");
    } catch (error) {
      console.log("ERROR GENERAL:", error);
      Alert.alert(
        "Error",
        error.message || "No se pudo actualizar el perfil"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <Text style={styles.headerSubtitle}>
            Completa tu información académica
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Foto de perfil */}
        <View style={styles.photoSection}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={seleccionarImagen}
            activeOpacity={0.8}
          >
            {foto ? (
              <Image source={{ uri: foto }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="person" size={50} color="#999" />
              </View>
            )}
            <View style={styles.cameraBtn}>
              <Ionicons name="camera" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.photoLabel}>Toca para cambiar foto</Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          
          {/* Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="Tu nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
                placeholderTextColor="#CCC"
              />
            </View>
          </View>

          {/* Apellido */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apellido</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="Tu apellido"
                value={apellido}
                onChangeText={setApellido}
                style={styles.input}
                placeholderTextColor="#CCC"
              />
            </View>
          </View>

          {/* Documento */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Documento de identidad</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="Número de documento"
                value={documento}
                onChangeText={setDocumento}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor="#CCC"
              />
            </View>
          </View>

          {/* Correo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico</Text>
            <View style={[styles.inputContainer, styles.inputDisabled]}>
              <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="correo@ejemplo.com"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={false}
                placeholderTextColor="#CCC"
              />
              <Ionicons name="lock-closed" size={16} color="#999" />
            </View>
            <Text style={styles.helperText}>
              El correo no puede modificarse
            </Text>
          </View>

          {/* Teléfono */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="3001234567"
                value={telefono}
                onChangeText={setTelefono}
                style={styles.input}
                keyboardType="phone-pad"
                placeholderTextColor="#CCC"
              />
            </View>
          </View>

          {/* Carrera */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Carrera</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="school-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="Ej: Ingeniería de Sistemas"
                value={carrera}
                onChangeText={setCarrera}
                style={styles.input}
                placeholderTextColor="#CCC"
              />
            </View>
          </View>

          {/* Semestre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Semestre actual</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="calendar-outline" size={20} color="#999" style={styles.inputIcon} />
              <TextInput
                placeholder="Ej: 6"
                value={semestre}
                onChangeText={setSemestre}
                style={styles.input}
                keyboardType="numeric"
                maxLength={2}
                placeholderTextColor="#CCC"
              />
            </View>
          </View>

          {/* Botón guardar */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={guardarPerfil}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
            <Text style={styles.saveBtnText}>Guardar cambios</Text>
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
    paddingBottom: 40,
  },

  /* HEADER */
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },

  /* FOTO */
  photoSection: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 32,
  },
  photoContainer: {
    position: 'relative',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F0EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E8E4E0',
    borderStyle: 'dashed',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3DAB7B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F5F0EB',
  },
  photoLabel: {
    fontSize: 13,
    color: '#999',
    marginTop: 12,
  },

  /* FORM */
  form: {
    paddingHorizontal: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1.5,
    borderColor: '#E8E4E0',
  },
  inputDisabled: {
    backgroundColor: '#F8F8F8',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },
  helperText: {
    fontSize: 11,
    color: '#999',
    marginTop: 6,
    marginLeft: 4,
  },

  /* BOTÓN */
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#3DAB7B',
    paddingVertical: 18,
    borderRadius: 14,
    marginTop: 12,
    shadowColor: '#3DAB7B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});