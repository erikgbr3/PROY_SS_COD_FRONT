import React from 'react';
import { FC, useEffect } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlayersProvider, usePlayersState } from '../providers/playersProvider';
import PlayersCard from './components/playersCard';

type Props = {
  navigation: any;
}
const PlayersScreenView:FC<Props> = ({navigation}) => {

  const {
    loading,
    players,
    playerSelected,

    getPlayers,
    setPlayerSelected,
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

  const newPlayer = () => {
    navigation.navigate('agregarJugador');
  }

    return (
    <View style={styles.container}>
        <View style={styles.nav}>
            <Text style={styles.text}>Jugadores</Text>
        </View>
        <View>
          <TouchableOpacity
          style={styles.button}
          onPress={newPlayer}>
            <Text style={styles.buttonText}>Nuevo Jugador</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.card}>
          {renderCards()}
        </ScrollView>
      
    </View>
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
    height:90,
  },
  button: {
    borderRadius: 9,
    marginTop: 5,
    width: 150,
    backgroundColor: 'blue',
    marginBottom: 5,
    position: 'absolute',
    left: '60%'
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  card: {
    marginTop: 35
  },
  text:{
    marginTop: 40, 
    marginLeft: 16,
    fontSize: 26,
    color: 'white'
  }
});