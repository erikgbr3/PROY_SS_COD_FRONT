import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';
import MatchesScreen from '../features/matches/application/screens/matchesScreen';
import ClubsScreen from '../features/clubs/application/screens/clubsScreen';

type Props = {
  route: any,
  navigation: any,
}

const Tab = createBottomTabNavigator();
const NavigationUser: React.FC<Props> =({route, navigation}) =>  {

  return (
    <Tab.Navigator>
      <Tab.Screen 
      name='Partidos Liga' 
      initialParams={{...route.params}}
      component={MatchesScreen} 
      options={{
        headerShown: false
      }}/>
      <Tab.Screen 
      name='Equipos Liga' 
      component={ClubsScreen} 
      options={{
        headerShown: false
      }}/> 
    </Tab.Navigator>
  );
}

export default NavigationUser;