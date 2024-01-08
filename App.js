import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";

import HomeScreen from './src/HomeScreen';
import LaporanScreen from './src/LaporanScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={ HomeScreen } />
        <Tab.Screen name="Laporan" component={ LaporanScreen } />
      </Tab.Navigator>
    </NavigationContainer>
  )
}