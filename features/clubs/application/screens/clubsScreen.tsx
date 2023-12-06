import React ,{ useEffect, FC } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ClubCard from './components/clubCard';
import { ClubsProvider, useClubsState } from '../providers/clubsProvider';

type Props = {
  navigation: any,
}

const ClubsScreenView:FC<Props> = ({navigation}) => {

  const {
    clubs,

    getClubs,
    //setClubSelected,
  } = useClubsState();
 

  const renderCards = () => {
    if(clubs == null)
    {
      return null;
    }
    return clubs?.map((club) => (
      <ClubCard 
        key={`club${club.name}`} 
        club={club} 
      />
    ));
  }

  useEffect(() => {
    getClubs();
  }, []);

  const addClub = () => {
    navigation.navigate('crearClub');
  }

    return (
    <ScrollView style={styles.container}>
        <View style={styles.nav}>
            <Text style={styles.text}>Echale un vistazo</Text>
            <TouchableOpacity style={styles.add} onPress={addClub}>
              <Text style={styles.addText}>Modo Admin</Text>
            </TouchableOpacity>
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
    height:90,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',

  },
  text:{
    marginTop: 40,
    marginLeft: 16,
    fontSize: 26,
    color: 'white'
  },
  add:{
    width: 60,
    margin: 15
  },
  addText:{
    color: 'white',
  }
});