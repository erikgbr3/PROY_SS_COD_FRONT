import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MatchesProvider, useMatchesState } from '../providers/matchesProvider';
import MatchesCard from './components/matchesCard';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import MatchEditScreen from './components/matchEditScreenReferee';
import MatchDeleteScreen from './components/deleteMatch';

type Props = {
  route: any,
  navigation: any
}

const MatchesScreenView: React.FC<Props> = ({route, navigation}) => {

  let leagueName = "Liga de Futbol";
  
  if (route.params?.leagueName) {
    leagueName = route.params.leagueName;
  }

   const {
    loading,
    matches,
    matchSelected,
    matchSelectedDeleted, 

    getMatches,
    setMatchSelected,
    setMatchSelectedDeleted,
    onUpdatedMatch,
    onDeleteMatch,
   } = useMatchesState(); 

   const renderCards = () => {
    if (!matches || matches.length === 0) {
      return <Text>No matches available</Text>;
    }

    let currentDate: string | null = null;

    return matches.map((match, index,) => {
      const showDate = currentDate !== match.date;
      currentDate = match.date;

      return (
        <View key={`match-${match.id}`}>
          {showDate && <Text style={styles.dateText}>{match.date}</Text>}
          <MatchesCard
            key={match.id}
            match={match} 
          />
        </View>
      );
    });
  };

   useEffect(() => {
    getMatches(route.params.leagueId);
   }, []);

   if(loading) {
    return(
      <ScrollView>
        <Text>Cargando...</Text> 
      </ScrollView>
    ) 
   }


  return (
      <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.title}>Partidos</Text>
      </View>
      <ScrollView>
        {renderCards()}    
      </ScrollView> 

      {!!matchSelected ? (
          <MatchEditScreen
            matchEdit={matchSelected}
            menuVisible={!!matchSelected}
            onSaved={onUpdatedMatch}
            onCancelEdit={setMatchSelected}
          />

      ): null}
      {!!matchSelectedDeleted ? (
        <MatchDeleteScreen
        matchDelete={matchSelectedDeleted}
        menuVisible={!!matchSelectedDeleted}
        onDeleted={onDeleteMatch}
        onCancelDelete={setMatchSelectedDeleted}
      />
      ): null}
    </View>
  );
}

const MatchesScreen = (props : any) => {
  return(
  <MatchesProvider>
    <MatchesScreenView {...props}/>
  </MatchesProvider>
  )
}

export default MatchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  top: {
    width: 500,
    backgroundColor: 'blue',
    paddingTop: 5,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    paddingLeft: 2,
    color: '#0d47a1'
  },
  dateText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    marginRight: 5,
    textAlign: 'left',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
