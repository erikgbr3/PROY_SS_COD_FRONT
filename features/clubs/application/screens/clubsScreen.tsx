import React, { useEffect, FC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ClubCard from './components/clubCard';
import { ClubsProvider, useClubsState } from '../providers/clubsProvider';

type Props = {
  route:any,
  navigation: any,
}

const ClubsScreenView: FC<Props> = ({ route,navigation }) => {

  const {
    clubs,

    getClubs,
    //setClubSelected,
  } = useClubsState();


  const renderCards = () => {
    if (clubs == null) {
      return null;
    }
    return clubs?.map((club) => (
      <TouchableOpacity style = {styles.cardContainer} key={club.id}
       onPress={() => navigation.navigate('Jugadores Inv', {clubId:club.id, clubName: club.name})}>
        <ClubCard club={club}/>
      </TouchableOpacity>
    ));
  }

  useEffect(() => {
    getClubs(route.params.leagueId);
  }, []);

  const addClub = () => {
    navigation.navigate('crearClub');
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style = {styles.title}>Equipos que luchan por la gloria</Text>
    </View>
    <ScrollView style={{flexGrow: 0, padding:5, marginTop: 4, width: '100%'}}>
      <View style = {[styles.fila]}>
          {renderCards()}
      </View>
    </ScrollView> 
    <StatusBar style="auto" />
  </SafeAreaView>
  );
}

const ClubsScreen = (props: any) => (
  <ClubsProvider>
    <ClubsScreenView {...props} />
  </ClubsProvider>
)


export default ClubsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  header:{
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center', 
    paddingLeft: 2,
    color:'#0d47a1'
  },
  cardContainer:{
    width: '50%', // Ajusta el ancho de las tarjetas según sea necesario
    marginBottom: 10,
  },
  fila:{
    flexDirection: 'row',
    flexWrap:'wrap'
  }
});