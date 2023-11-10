import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from './features/auth/application/screens/authScreen';
import { NavigationContainer } from '@react-navigation/native';
import NavigationTabs from './components/navigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName='Auth'
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen
        name='Auth'
        component={AuthScreen}
        />
        <Stack.Screen
        name='Main'
        component={NavigationTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


