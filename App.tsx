import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './components/navigation';
import AddMatchScreen from './features/matches/application/screens/addMatchScreen';
import MatchesScreen from './features/matches/application/screens/matchesScreen';
import { ClubsProvider } from './features/clubs/application/providers/clubsProvider';
import PlayersScreen from './features/players/application/screens/playersScreen';
import LeaguesScreen from './features/leagues/application/screens/leaguesScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation/>
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
