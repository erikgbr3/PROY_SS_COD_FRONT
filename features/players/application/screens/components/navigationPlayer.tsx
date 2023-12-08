import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayersScreen from '../playersScreen';
import AddPlayerScreen from './AddPlayersScreen';

const Stack = createNativeStackNavigator();

export default function PlayerNavigation() {

  return (
        <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }} >
          <Stack.Screen name='Player' component={PlayersScreen} />
          <Stack.Screen name='AddPlayer' component={AddPlayerScreen} />
        </Stack.Navigator>
  );
}
