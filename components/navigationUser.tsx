import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import ClubsScreen from '../features/clubs/application/screens/clubsScreen';
import PositionsScreen from '../features/tablepositions/application/screens/positionScreen';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


type Props = {
  route: any,
  navigation: any,
}

const Tab = createBottomTabNavigator();

const NavigationUser: React.FC<Props> = ({ route, navigation }) => {

  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: '#0d47a1',tabBarInactiveTintColor:'#1d99ff'}}>
      <Tab.Screen
        name='Partidos Liga'
        initialParams={{ ...route.params }}
        component={MatchesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="soccer-field" size={24} color={color} />
            ),
          tabBarLabel: 'Partidos'
        }} />
      <Tab.Screen
        name='Equipos Liga'
        initialParams={{ ...route.params }}
        component={ClubsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="sports-club" size={24} color={color}/>
          ),
          tabBarLabel: 'Equipos',
        }} />
      <Tab.Screen
        name='Posiciones'
        initialParams={{ ...route.params }}
        component={PositionsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="list" size={24} color={color} />
          ),
          tabBarLabel: 'Tabla de Posiciones'
        }}
      />
    </Tab.Navigator>
  );
}

export default NavigationUser;