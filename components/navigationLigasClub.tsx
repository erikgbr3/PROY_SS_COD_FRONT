import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchesScreenAdmin from '../features/matches/application/screens/matchesScreenAdmin';
import { Entypo } from '@expo/vector-icons';
import PositionsScreen from '../features/tablepositions/application/screens/positionScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ClubsScreen from '../features/clubs/application/screens/clubsScreen';
import SuscriptionScreen from '../features/suscriptions/application/screens/suscriptionsScreen';
import PlayersScreen from '../features/players/application/screens/playersScreen';
import PlayerNavigation from '../features/players/application/screens/components/navigationPlayer';
import AddPlayerScreen from '../features/players/application/screens/components/AddPlayersScreen';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import PlayersAdminScreen from '../features/players/application/screens/AddPlayersScreen';


type Props = {
  route: any,
  navigation: any,
}
const Tab = createBottomTabNavigator();

const NavigationLigasClub: React.FC<Props> = ({ route, navigation }) => {

  return (

    <Tab.Navigator
      initialRouteName='Matches'
      screenOptions={{
        tabBarActiveTintColor: '#0d47a1',
        tabBarInactiveTintColor: '#1d99ff',
      }}
    >
      <Tab.Screen
        name="Jugadores"
        initialParams={{ ...route.params }}
        component={PlayersAdminScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="group" size={24} color={color} />
          ),
          tabBarLabel: 'Jugadores'
        }}
      />
      <Tab.Screen
        name="AddPlayer"
        initialParams={{ ...route.params }}
        component={AddPlayerScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="adduser" size={24} color={color} />
            ),
          tabBarLabel: 'Jugadores'
        }}
      />
    </Tab.Navigator>
  );
}

export default NavigationLigasClub