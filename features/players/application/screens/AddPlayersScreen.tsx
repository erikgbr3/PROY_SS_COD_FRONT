import React from 'react';
import { FC, useEffect } from 'react';
import { Button, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PlayerEditScreen from './components/playerEditScreen';
import PlayerDeleteScreen from './components/deletePlayer';
import { PlayersAdminProvider, usePlayersAdminState } from '../providers/playersAdminProvider';
import PlayersCardAdmin from './components/playersCardAdmin';
import { MaterialIcons } from '@expo/vector-icons';


type Props = {
  route: any,
  navigation: any
}

const PlayersAdminScreenView: FC<Props> = ({ route, navigation }) => {

  let clubName = "Liga de Futbol";

  if (route.params?.clubName) {
    clubName = route.params.clubName;
  }

  const {
    loading,
    players,
    playerSelected,
    playerSelectedDeleted,

    getPlayers,
    setPlayerSelected,
    setPlayerSelectedDeleted,
    onUpdatedPlayer,
    onDeletePlayer,
  } = usePlayersAdminState();


  const renderCards = () => {
    if (players == null) {
      return null;
    }
    return players?.map((player) => (
      <PlayersCardAdmin
        key={`player${player.id}`}
        player={player}
        onEdit={setPlayerSelected}
        onDeleted={setPlayerSelectedDeleted}
      />
    ));
  }

  useEffect(() => {
    getPlayers(route.params.clubId);
  }, []);

  if (loading) {
    return (
      <ScrollView>
        <Text>Cargando...</Text>
      </ScrollView>
    )
  }

  const newPlayer = () => {
    navigation.navigate('AddPlayer');
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.nav}>
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
        </ScrollView> */}
      <View style={styles.header}>
        <Text style={styles.title}>Listado de Jugadores</Text>
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {renderCards()}
        </View>
      <Pressable
        style={[styles.button, {alignItems:'center', justifyContent:'center'}]}
        onPress={newPlayer}>
        <MaterialIcons name="add" size={26} color="white" />
      </Pressable>
      </ScrollView>
      <View>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={newPlayer}>
          <Text style={styles.buttonText}>Nuevo Jugador</Text>
        </TouchableOpacity> */}
        
      </View>

      {!!playerSelected ? (
        <PlayerEditScreen
          playerEdit={playerSelected}
          menuVisible={!!playerSelected}
          onSaved={onUpdatedPlayer}
          onCancelDelete={setPlayerSelected}
        />
      ) : null}

      {!!playerSelectedDeleted ? (
        <PlayerDeleteScreen
          playerDelete={playerSelectedDeleted}
          menuVisible={!!playerSelectedDeleted}
          onDeleted={onDeletePlayer}
          onCancelDelete={setPlayerSelectedDeleted}
        />
      ) : null}

    </View>
  );
}

const PlayersAdminScreen = (props: any) => (
  <PlayersAdminProvider>
    <PlayersAdminScreenView {...props} />
  </PlayersAdminProvider>
)

export default PlayersAdminScreen;

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
  nav: {
    backgroundColor: '#003c8f',
    height: 90,
  },
  button: {
    borderRadius: 50,
    width:50,
    height: 50,
    marginTop: 5,
    backgroundColor: '#0d47a1',
    marginBottom: 5,
    position: 'absolute',
    right: 20,
    bottom:30
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  card: {
    marginTop: 35
  },
  text: {
    marginTop: 40,
    marginLeft: 16,
    fontSize: 26,
    color: 'white'
  }
});