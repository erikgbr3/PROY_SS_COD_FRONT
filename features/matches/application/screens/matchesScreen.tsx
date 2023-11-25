import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MatchesRepositoryImp from '../../infraestructure/repositories/matchesRepositoryImp';
import MatchesDatasourceImp from '../../infraestructure/datasources/matchesDatasourceImp';
import { useEffect, useState } from 'react';
import { MatchesProvider, useMatchesState } from '../providers/matchesProvider';
import MatchesCard from './components/matchesCard';
import Navigation from '../../../../components/navigationTabs';

const MatchesScreenView = () => {

   const {
    matches,
    loading,

    getMatches,
   } = useMatchesState();

   const renderCards = () => {
    if(matches == null || !matches) {
      return null
    }
    return matches?.map(
      (match) => <MatchesCard key={`match-${match.id}`} match={match} />
    );
   }

   useEffect(() => {
    getMatches();
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
      <View style={styles.top}>
        <Text style={styles.topTitle}>Liga Regional Tlaloc</Text>
      </View>
      <Text style={styles.title}>Partidos</Text>
      <ScrollView>
          <View style={styles.card}>{renderCards()}</View>
      </ScrollView>    
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
    paddingTop: 35,
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
  topTitle: {
    color: 'white',
    fontSize: 28,
    marginLeft: 100,
    marginRight: 100,
  },
  title: {
    paddingTop: 10,
    fontWeight: '500',
    fontSize: 32,
    color: 'black',
  },
  card: {
    borderRadius: 10,
  }
});
