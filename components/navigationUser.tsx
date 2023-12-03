import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import ClubsScreen from '../features/clubs/application/screens/clubsScreen';

const Tab = createBottomTabNavigator();
export default function NavigationUser() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Partidos Liga' component={MatchesScreen} options={{
        headerShown: false
      }}/>
      <Tab.Screen name='Equipos Liga' component={ClubsScreen} options={{
        headerShown: false
      }}/> 
    </Tab.Navigator>
  );
}