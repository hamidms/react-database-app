import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

import HomeScreen from './src/HomeScreen';
import LaporanScreen from './src/LaporanScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Input">
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="calculate" size={30} color={'#43766C'}/>
            ),
          }}
        />
        <Tab.Screen 
          name="Laporan" 
          component={LaporanScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="list-alt" size={30} color={'#43766C'}/>
            ),
            }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
