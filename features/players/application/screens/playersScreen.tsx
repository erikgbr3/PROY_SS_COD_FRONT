import React from 'react';
import { FC, useEffect } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlayersProvider, usePlayersState } from '../providers/playersProvider';
import PlayersCard from './components/playersCard';

type Props = {
  route:any,
  navigation: any;
}
const PlayersScreenView:FC<Props> = ({route,navigation}) => {

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
    return players?.map((player) => (
        <PlayersCard key={player.id} player={player} />
    ));
  }

  useEffect(() => {
    getPlayers(route.params.clubId);
  }, []);

  const newPlayer = () => {
    navigation.navigate('agregarJugador');
  }

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Listado de Jugadores</Text>
        </View>
        <ScrollView>
        <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
          {renderCards()}
        </View>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    paddingLeft: 2,
    color: '#0d47a1'
  },
  header: {   
    justifyContent: 'center',
    alignItems: 'center'
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
  text:{
    marginTop: 40, 
    marginLeft: 16,
    fontSize: 26,
    color: 'white'
  }
});