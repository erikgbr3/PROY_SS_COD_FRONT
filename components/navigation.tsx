import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchesScreenAdmin from '../features/matches/application/screens/matchesScreenAdmin';
import { Entypo } from '@expo/vector-icons';
import PositionsScreen from '../features/tablepositions/application/screens/positionScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ClubsScreen from '../features/clubs/application/screens/clubsScreen';


type Props = {
  route: any,
  navigation: any,
}
const Tab = createBottomTabNavigator();

const NavigationLeagueAdmin: React.FC<Props> = ({ route, navigation }) => {

  return (

    <Tab.Navigator
      initialRouteName='Matches'
      screenOptions={{
        tabBarActiveTintColor: '#0d47a1',
        tabBarInactiveTintColor: '#1d99ff',
      }}
    >
      <Tab.Screen
        name="Matches"
        initialParams={{ ...route.params }}
        component={MatchesScreenAdmin}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="soccer-field" size={24} color={color} />
          ),
          tabBarLabel: 'Partidos'
        }}
      />
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

export default NavigationLeagueAdmin