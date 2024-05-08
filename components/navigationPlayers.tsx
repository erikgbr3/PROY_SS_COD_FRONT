import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayersScreen from '../features/players/application/screens/playersScreen';

type Props = {
  route: any,
  navigation: any,
  clubName?:String 
}

const Tab = createNativeStackNavigator();

const NavigationPlayers: React.FC<Props> = ({ route, navigation }) => {

  return (
    <Tab.Navigator >
      <Tab.Screen
        name='Jugadores'
        initialParams={{ ...route.params }}
        component={PlayersScreen}
        options={({ route }) => {
          const params = route.params as Props;
          return {
            title: params.clubName ? String(params.clubName) : 'Jugadores',
            headerShown: true, 
          };
        }}
      />
    </Tab.Navigator>
  );
}

export default NavigationPlayers;