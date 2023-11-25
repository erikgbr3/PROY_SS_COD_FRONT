import React from 'react';
import LeaguesScreen from '../features/leagues/application/screens/leaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SportFieldsScreen from '../features/sportfields/application/screens/sporFieldsScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import PlayersScreen from '../features/players/application/screens/playersScreen';
import AddPlayerScreen from '../features/players/application/screens/AddPlayersScreen';
import SuscriptionScreen from '../features/suscriptions/application/screens/suscriptionsScreen';


const Tab = createNativeStackNavigator();

export default function NavigationTabs() {
  return(
   <Tab.Navigator initialRouteName='Ligas' screenOptions={{headerShown: false }}>
    <Tab.Screen name='Ligas' component={PlayersScreen}/>
    <Tab.Screen name='Partidos' component={PlayersScreen}/>
    <Tab.Screen name='agregarJugador' component={AddPlayerScreen}/>
   </Tab.Navigator>
  )
}