import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddLeaguesScreen from '../features/leagues/application/screens/addLeaguesScreen';

const Tab = createBottomTabNavigator();
export default function NavigationAdmin() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Admin' component={AddLeaguesScreen} options={{
        headerShown: false,
        title: 'Ligas'
      }}/>
    </Tab.Navigator>
  );
}