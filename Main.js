// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";

import InputPage from './src/InputPage';
import ReportPage from './src/ReportPage';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Input">
        <Tab.Screen name="Input" component={InputPage} />
        <Tab.Screen name="Report" component={ReportPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;
