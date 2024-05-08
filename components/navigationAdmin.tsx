import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MatchesScreenAdmin from '../features/matches/application/screens/matchesScreenAdmin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationLeagueAdmin from './navigation';

interface RouteParams {
  leagueName?: string;
}

const Tab = createNativeStackNavigator();
export default function NavigationAdmin() {
  return (
    <Tab.Navigator screenOptions={{  }}>
      <Tab.Screen name='Admin' component={AddLeaguesScreen}
        options={{
          headerShown: false,
          title: 'Ligas',
        }} />
        <Tab.Screen name='partidos' component={NavigationLeagueAdmin}
        options={({ route }) => {
          const params = route.params as RouteParams;
          return {
            title: params.leagueName ? params.leagueName : 'Info Liga',
            headerShown: true, 
          };
        }} />
    </Tab.Navigator>
  );
}