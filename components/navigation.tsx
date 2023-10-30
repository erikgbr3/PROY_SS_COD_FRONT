import LeaguesScreen from "../features/leagues/application/screens/leaguesScreen";
import MatchesScreen from "../features/matches/application/screens/matchesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function StackNavigation() {
  return(
    <Tab.Navigator>
      <Tab.Screen
      name="Leagues"
      component={LeaguesScreen}
      />
      <Tab.Screen
      name="Matches"
      component={MatchesScreen}/>
    </Tab.Navigator>
  );
}

export default function NavigationStack() {
  return(
    <NavigationContainer>
      <StackNavigation/>
    </NavigationContainer>
  )
}