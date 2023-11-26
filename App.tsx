import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './features/auth/application/screens/authScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationTabs from './components/navigationTabs';
import AddUsersScreen from './features/users/application/screens/addUsersScreen';
import AddLeaguesScreen from './features/leagues/application/screens/addLeaguesScreen';
import NavigationAdmin from './components/navigationAdmin';
import { AuthProvider } from './features/auth/application/providers/authProvider';


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
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}