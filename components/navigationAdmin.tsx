import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
export default function NavigationAdmin() {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#0d47a1'}}>
      <Tab.Screen name='Admin' component={AddLeaguesScreen}
        options={{
          headerShown: false,
          title: 'Ligas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="soccer" color={color} size={30} />
          ),
        }} />
    </Tab.Navigator>
  );
}