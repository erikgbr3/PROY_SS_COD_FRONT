import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddClubScreen from '../features/clubs/application/screens/addClubScreen';

const Tab = createBottomTabNavigator();
export default function NavigationClubManager() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='clubManager' component={AddClubScreen} options={{
        headerShown: false,
        title: 'Equipos'
      }}/>
    </Tab.Navigator>
  );
}