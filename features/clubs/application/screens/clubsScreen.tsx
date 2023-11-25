import React from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ClubCard from './components/clubCard';
import { ClubsProvider, useClubsState } from '../providers/clubsProvider';

const ClubsScreenView = () => {

  const {
    clubs,
    loading,

    getClubs

  } = useClubsState();
 

  const renderCards = () => {
    if(clubs == null)
    {
      return null;
    }
    return clubs?.map((club) => (<ClubCard key={`club${club.id}`} club={club} />
    ));
  }

  useEffect(() => {
    getClubs();
  }, []);

    return (
    <ScrollView style={styles.container}>
        <View style={styles.nav}>
            <Text style={styles.text}>Echale un vistazo</Text>
        </View>
        
      {renderCards()}
    </ScrollView>
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