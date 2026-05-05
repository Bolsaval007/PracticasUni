import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import DashboardScreen from '../screens/estudiante/DashboardScreen';
import ProcesosScreen from '../screens/estudiante/ProcesosScreen';
import MenuScreen from '../screens/estudiante/MenuScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ label, emoji, focused }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10, width: 90  }}>
    <Text style={{ fontSize: 25 }}>{emoji}</Text>
    <Text
  style={{
    fontSize: 13,
    marginTop: 4,
    color: focused ? '#3DAB7B' : '#888',
    fontWeight: focused ? '700' : '400'
  }}
  numberOfLines={1}
  
>
  {label}
</Text>
  </View>
);

export default function EstudianteNavigator() {
  return (
    <Tab.Navigator
initialRouteName="Inicio"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1A1A1A',
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 20,
          paddingTop: 10, 
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Inicio" emoji="🏠" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Procesos"
        component={ProcesosScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Procesos" emoji="📋" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon label="Menú" emoji="☰" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}