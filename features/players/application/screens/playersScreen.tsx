import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { PlayersProvider, usePlayersState } from '../providers/playersProvider';
import PlayersCard from './components/playersCard';

const PlayersScreenView = () => {

  const {
    players,

    getPlayers

  } = usePlayersState();
 

  const renderCards = () => {
    if(players == null)
    {
      return null;
    }
    return players?.map((player) => (<PlayersCard key={`player${player.id}`} player={player} />
    ));
  }

  useEffect(() => {
    getPlayers();
  }, []);

    return (
    <ScrollView style={styles.container}>
        <View style={styles.nav}>
            <Text style={styles.text}>Jugadores</Text>
        </View>
        
      {renderCards()}
    </ScrollView>
  );
}

const PlayersScreen = (props: any) => (
  <PlayersProvider>
    <PlayersScreenView {...props} /> 
  </PlayersProvider>
)

export default PlayersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  nav:{
    backgroundColor: '#003c8f',
    height:90
  },
  text:{
    marginTop: 40,
    marginLeft: 16,
    fontSize: 26,
    color: 'white'
  }
});