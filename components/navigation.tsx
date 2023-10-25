import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LeaguesScreen from "../features/leagues/application/screens/leaguesScreen";
import MatchesScreen from "../features/matches/application/screens/matchesScreen";

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
  )
}

export default function Navigation () {
  return(
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}
