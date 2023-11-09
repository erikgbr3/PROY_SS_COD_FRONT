import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './features/auth/application/screens/authScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationTabs from './components/navigationTabs';
import AddUsersScreen from './features/users/application/screens/addUsersScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Auth' screenOptions={{headerShown: false }} >
          <Stack.Screen name='Auth' component={AuthScreen} />
          <Stack.Screen name='Main' component={NavigationTabs}/>
          <Stack.Screen name='sign up' component={AddUsersScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}