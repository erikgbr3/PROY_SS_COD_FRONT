import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddClubScreen from '../features/clubs/application/screens/addClubScreen';
import { Entypo } from '@expo/vector-icons';
import AddSportFieldScreen from '../features/sportfields/application/screens/addSportFieldScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuscriptionScreen from '../features/suscriptions/application/screens/suscriptionsScreen';
import NavigationLigasClub from './navigationLigasClub';

const Tab = createNativeStackNavigator();
export default function NavigationClubManager() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='clubManager' component={AddClubScreen} options={{
        headerShown: false,
        title: 'Equipos',
      }} />
      <Tab.Screen name='CamposAdd' component={AddSportFieldScreen} options={{
        headerShown: true,
        title: 'Campos Disponibles',
       
      }} />
      <Tab.Screen name='sus' component={NavigationLigasClub} options={{
        headerShown: true,
        title: 'Jugadores',
       
      }} />
    </Tab.Navigator>
  );
}