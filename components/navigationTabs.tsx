import LeaguesScreen from '../features/leagues/application/screens/leaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SportFieldsScreen from '../features/sportfields/application/screens/sporFieldsScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import ClubsScreen from '../features/clubs/application/screens/clubsScreen';
import AddClubScreen from '../features/clubs/application/screens/addClubScreen';


const Tab = createNativeStackNavigator();

export default function NavigationTabs() {
  return(
    <Tab.Navigator initialRouteName='Ligas' screenOptions={{headerShown: false }}>
    <Tab.Screen name='Ligas' component={LeaguesScreen}/>
    <Tab.Screen name='Partidos' component={MatchesScreen}/>
    <Tab.Screen name='agregarLiga' component={AddLeaguesScreen}/>
   </Tab.Navigator>
  )
}