import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import LeaguesScreen from '../features/leagues/application/screens/leaguesScreen';
import addLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../features/auth/application/screens/authScreen';

const Tab = createNativeStackNavigator();

function Nav() {
  return (
    <Tab.Navigator
      initialRouteName='Ligas'
    >
      <Tab.Screen
        name="Agregar Liga"
        component={addLeaguesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Ligas"
        component={LeaguesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Partidos"
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