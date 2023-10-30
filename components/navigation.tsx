import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import LeaguesScreen from '../features/leagues/application/screens/leaguesScreen';
import addLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SportFieldsScreen from '../features/sportfields/application/screens/sporFieldsScreens';


const Stack = createNativeStackNavigator();

function StackNavigation() {

  return (

    <Stack.Navigator>
      <Stack.Screen
        name="Leagues"
        component={LeaguesScreen}
      />
      <Stack.Screen 
        name="Matches"
        component={MatchesScreen}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return(
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  )
}