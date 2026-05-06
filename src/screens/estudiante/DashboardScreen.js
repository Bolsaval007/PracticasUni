import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../../supabase.config";
import { useState } from "react";
import React from "react";
import { FAB, Portal } from "react-native-paper";

/* ── AVATAR COMPONENT ── */
const Avatar = ({ nombre, apellido, foto }) => {
  const getInitials = () => {
    const n = nombre?.trim() || "";
    const a = apellido?.trim() || "";
    return (n[0] + (a[0] || "")).toUpperCase() || "U";
  };

  if (foto) {
    return (
      <Image
        source={{ uri: foto }}
        style={{ width: 56, height: 56, borderRadius: 28 }}
      />
    );
  }

  return (
    <View
      style={{
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#3DAB7B",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
        {getInitials()}
      </Text>
    </View>
  );
};



const postulaciones = [
  { id: "1", nombre: "Glide", color: "#F0F0F0", letra: "G", letraColor: "#333", acento: "#F5A842" },
  { id: "2", nombre: "Amazon", color: "#F5A842", letra: "a", letraColor: "#1A1A1A", acento: "#1A1A1A" },
  { id: "3", nombre: "Zeroazul", color: "#E8547A", letra: "Z", letraColor: "#FFFFFF", acento: "#FFFFFF" },
];

export default function DashboardScreen({ navigation }) {
  const { perfil } = useAuth();

  const [menuVisible, setMenuVisible] = React.useState(false);

  const handleLogout = async () => {
  try {
    setMenuVisible(false);

    await supabase.auth.signOut();

    // NO navegues manualmente
    // RootNavigator detecta user = null y cambia a AuthNavigator
  } catch (error) {
    console.log("Error al cerrar sesión:", error);
  }
};

  const capitalizeWords = (text) => {
    if (!text) return "";

    return text
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [open, setOpen] = React.useState(false);
  const onStateChange = ({ open }) => setOpen(open);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.saludo}>
              Hola, {perfil?.nombre || "Estudiante"} 👋
            </Text>

            <Text style={styles.heroText}>
              Todo listo para{"\n"}
              <Text style={styles.heroGreen}>
                comenzar tu{"\n"}práctica
              </Text>
            </Text>
          </View>

          {/* AVATAR CON MENU */}
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Avatar
              nombre={perfil?.nombre}
              apellido={perfil?.apellido}
              foto={perfil?.foto_url}
            />
          </TouchableOpacity>
        </View>

        {/* ── POSTULACIONES ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Postulaciones</Text>
          <Text style={styles.sectionSub}>Te postulaste en estas empresas</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cardsScroll}
            contentContainerStyle={styles.cardsScrollContent}
          >
            {postulaciones.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[styles.empresaCard, { backgroundColor: p.color }]}
                activeOpacity={0.8}
              >
                <Text style={[styles.empresaLetra, { color: p.letraColor }]}>
                  {p.letra}
                </Text>
                {p.acento !== p.letraColor && (
                  <Text style={[styles.empresaArrow, { color: p.acento }]}>›</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── ENTREVISTAS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entrevistas</Text>

          <View style={styles.entrevistaCard}>
            <View style={styles.entrevistaLeft}>
              <Text style={styles.entrevistaNombre}>ZEROAZUL.</Text>
              <Text style={styles.entrevistaArea}>Programación</Text>

              <View style={styles.entrevistaInfo}>
                <Text style={styles.infoIcon}>🕐</Text>
                <Text style={styles.infoText}>10:25 a.m</Text>
              </View>
              <View style={styles.entrevistaInfo}>
                <Text style={styles.infoIcon}>👤</Text>
                <Text style={styles.infoText}>Fabian Andres</Text>
              </View>
              <View style={styles.entrevistaInfo}>
                <Text style={styles.infoIcon}>💻</Text>
                <Text style={styles.infoText}>Google Meet</Text>
              </View>
            </View>

            <View style={styles.entrevistaLogo}>
              <Text style={styles.entrevistaLogoText}>Z</Text>
              <View style={styles.entrevistaLogoDot} />
            </View>
          </View>
        </View>

      </ScrollView>

      {/* ── MENU DESPLEGABLE ── */}
      {menuVisible && (
        <>
          {/* fondo para cerrar */}
          <TouchableOpacity
            onPress={() => setMenuVisible(false)}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />

          {/* menu */}
          <View
            style={{
              position: "absolute",
              top: 120,
              right: 20,
              backgroundColor: "white",
              padding: 15,
              borderRadius: 12,
              width: 240,
              elevation: 5,
              zIndex: 999,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {capitalizeWords(perfil?.nombre)} {capitalizeWords(perfil?.apellido)}
            </Text>

            <Text>Carrera: {perfil?.carrera || "No registrada"}</Text>
            <Text>Semestre: {perfil?.semestre || "N/A"}</Text>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Perfil");
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#3DAB7B",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Perfil
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              style={{
                marginTop: 10,
                backgroundColor: "#E8547A",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                Cerrar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "close" : "menu"}
          color="white"
          fabStyle={{
            backgroundColor: "#000",
            width: 70,
            height: 70,
            borderRadius: 35,
          }}
          actions={[
            {
              icon: "home",
              label: "Inicio",
              onPress: () => navigation.navigate("Inicio"),
            },
            {
              icon: "account-clock",
              label: "Procesos",
              onPress: () => navigation.navigate("Procesos"),
            },
            {
              icon: "menu",
              label: "Menú",
              onPress: () => console.log("Menu"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) setOpen(false);
          }}
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    paddingBottom: 20,
  },

  /* ── HEADER ── */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  saludo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  heroText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 34,
  },
  heroGreen: {
    color: '#3DAB7B',
    fontWeight: '700',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EAF3DE',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  avatarEmoji: {
    fontSize: 36,
  },

  /* ── SECCIONES ── */
  section: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },

  /* ── CARDS POSTULACIONES ── */
  cardsScroll: {
    marginHorizontal: -24,
  },
  cardsScrollContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  empresaCard: {
    width: 110,
    height: 110,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  empresaLetra: {
    fontSize: 42,
    fontWeight: '800',
  },
  empresaArrow: {
    fontSize: 32,
    fontWeight: '700',
    marginLeft: -4,
    marginTop: 8,
  },

  /* ── CARD ENTREVISTA ── */
  entrevistaCard: {
    backgroundColor: '#A89CEC',
    borderRadius: 20,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 160,
  },
  entrevistaLeft: {
    flex: 1,
  },
  entrevistaNombre: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  entrevistaArea: {
    fontSize: 13,
    color: '#E8E4FF',
    marginBottom: 14,
  },
  entrevistaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  infoIcon: {
    fontSize: 14,
  },
  infoText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  entrevistaLogo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  entrevistaLogoText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  entrevistaLogoDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3DAB7B',
    position: 'absolute',
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: '#2D2D2D',
  },
});