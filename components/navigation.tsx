import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import LeaguesScreen from '../features/leagues/application/screens/leaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

function Nav() {
  return (
    <Tab.Navigator
    >
        <Tab.Screen
        name="Clubs"
        component={LeaguesScreen}
        />
        <Tab.Screen
        name="Leagues"
        component={MatchesScreen}
        />
    </Tab.Navigator>
  );
}

export default function Navigation() {
    return (
    <NavigationContainer>
      <Nav/>
    </NavigationContainer>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});