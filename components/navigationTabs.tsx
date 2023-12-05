import React from 'react';
import LeaguesScreen from '../features/leagues/application/screens/leaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SportFieldsScreen from '../features/sportfields/application/screens/sporFieldsScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import NavigationUser from './navigationUser';
import ClubsScreen from '../features/clubs/application/screens/clubsScreen';
import AddClubScreen from '../features/clubs/application/screens/addClubScreen';


const Tab = createNativeStackNavigator();

export default function NavigationTabs() {
  return (
    <Tab.Navigator initialRouteName='Ligas'>
      <Tab.Screen name='Ligas' component={LeaguesScreen} options={{
        headerShown: false,
      }} />
      <Tab.Screen name='Info Liga'  component={NavigationUser} options={{
        headerShown: true,
      }} />
    </Tab.Navigator>
  )
}