import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MatchEditScreenReferee from './components/matchEditScreenReferee';
import MatchesCardReferee from './components/matchesCardReferee';
import { MatchesRefereeProvider, useMatchesRefereeState } from '../providers/matchesRefereeProvider';

type Props = {
  route: any,
  navigation: any
}

const MatchesScreenRefereeView: React.FC<Props> = ({route, navigation}) => {

   const {
    loading,
    matches,
    matchSelected, 

    getMatches,
    setMatchSelected,
    onUpdatedMatch,
   } = useMatchesRefereeState(); 

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
          <MatchesCardReferee
            key={match.id}
            match={match} 
            onEdit={setMatchSelected}
          />
        </View>
      );
    });
  };

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
      <Text style={styles.title}>Partidos</Text>
      <ScrollView>
            <View style={styles.card}>{renderCards()}</View>       
      </ScrollView> 

      {!!matchSelected ? (
          <MatchEditScreenReferee
            matchEdit={matchSelected}
            menuVisible={!!matchSelected}
            onSaved={onUpdatedMatch}
            onCancelEdit={setMatchSelected}
          />
      ): null}
    </View>
  );
}

const MatchesScreenReferee = (props : any) => {
  return(
  <MatchesRefereeProvider>
    <MatchesScreenRefereeView {...props}/>
  </MatchesRefereeProvider>
  )
}

export default MatchesScreenReferee;

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
    paddingTop: 10,
    fontWeight: '500',
    fontSize: 32,
    color: 'black',
  },
  dateText: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    marginRight: 5,
    textAlign: 'center',
  },
  card: {
    borderRadius: 10,
  },
});
