import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DashboardScreen from "../screens/estudiante/DashboardScreen";
import ProcesosScreen from "../screens/estudiante/ProcesosScreen";
import MenuScreen from "../screens/estudiante/MenuScreen";

import { FAB, Portal, PaperProvider } from "react-native-paper";

const Tab = createBottomTabNavigator();

/* ── ICONOS TABS ── */
const TabIcon = ({ label, emoji, focused }) => (
  <View style={{ alignItems: "center", justifyContent: "center", paddingTop: 10 }}>
    <Text style={{ fontSize: 22 }}>{emoji}</Text>
    <Text
      style={{
        fontSize: 12,
        marginTop: 4,
        color: focused ? "#3DAB7B" : "#888",
        fontWeight: focused ? "700" : "400",
      }}
    >
      {label}
    </Text>
  </View>
);

/* ── NAVEGADOR PRINCIPAL ── */
export default function EstudianteNavigator() {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation(); // 🔥 IMPORTANTE

  const onStateChange = ({ open }) => setOpen(open);

  return (
    <PaperProvider>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          initialRouteName="Inicio"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              display: "none",
            },
          }}
        >
          <Tab.Screen name="Inicio" component={DashboardScreen} />
          <Tab.Screen name="Procesos" component={ProcesosScreen} />
          <Tab.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>

        {/* ── FAB DESPLEGABLE ── */}
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
                onPress: () => navigation.navigate("Inicio"), // ✔
              },
              {
                icon: "clipboard-list",
                label: "Procesos",
                onPress: () => navigation.navigate("Procesos"), // ✔
              },
              {
                icon: "menu",
                label: "Menú",
                onPress: () => navigation.navigate("Menu"), // 🔥 FIX
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) setOpen(false);
            }}
          />
        </Portal>
      </View>
    </PaperProvider>
  );
}