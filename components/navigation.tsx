import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import LeaguesScreen from '../features/leagues/application/screens/leaguesScreen';
import addLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SportFieldsScreen from '../features/sportfields/application/screens/sporFieldsScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function NavigationTabs() {

  return (

    <Tab.Navigator
    initialRouteName='Leagues'
    screenOptions={{
      headerShown: false
    }}
    >
      <Tab.Screen
        name="Leagues"
        component={LeaguesScreen}
      />
      <Tab.Screen 
        name="Matches"
        component={MatchesScreen}
      />
    </Tab.Navigator>
  );
}