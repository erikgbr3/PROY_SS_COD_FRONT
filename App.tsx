import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from './features/auth/application/screens/authScreen';
import NavigationTabs from './components/navigationTabs';
import AddUsersScreen from './features/users/application/screens/addUsersScreen';
import NavigationAdmin from './components/navigationAdmin';
import { AuthProvider } from './features/auth/application/providers/authProvider';
import NavigationClubManager from './components/navigationClubManager';
import NavigationPlayers from './components/navigationPlayers';
import NavigationLeagueAdmin from './components/navigation';
import AddSportFieldScreen from './features/sportfields/application/screens/addSportFieldScreen';
import MatchesScreenReferee from './features/matches/application/screens/matchesScreenReferee';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    //Englobar con el estado de autenticación
    <AuthProvider>
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }} >
          <Stack.Screen name='Auth' component={AuthScreen} />
          <Stack.Screen name='Main' component={NavigationTabs} />
          <Stack.Screen name='sign up' component={AddUsersScreen} />
          <Stack.Screen name='Home Admin' component={NavigationAdmin} />
          <Stack.Screen name='Home Club Manager' component={NavigationClubManager}/>
          <Stack.Screen name='Jugadores Inv' component={NavigationPlayers}/>
          <Stack.Screen name='Home Referee' component={MatchesScreenReferee}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
