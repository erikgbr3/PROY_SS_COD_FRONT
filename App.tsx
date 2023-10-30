import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddPlayerScreen from './features/players/application/screens/AddPlayersScreen';
import PlayersScreen from './features/players/application/screens/playersScreen';
import NavigationStack from './components/navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <AddPlayerScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%'
  },
});
