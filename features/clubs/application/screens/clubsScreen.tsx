import { useEffect, FC } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ClubCard from './components/clubCard';
import { ClubsProvider, useClubsState } from '../providers/clubsProvider';

type Props = {
  navigation: any,
}

const ClubsScreenView:FC<Props> = ({navigation}) => {

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

  const addLeagues = () => {
    navigation.navigate('crearClub');
  }

    return (
    <ScrollView style={styles.container}>
        <View style={styles.nav}>
            <TouchableOpacity onPress={addLeagues}>
              <Text style={styles.add}>Agregar</Text>
            </TouchableOpacity>
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
    height:90,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text:{
    marginTop: 40,
    marginLeft: 16,
    fontSize: 26,
    color: 'white'
  },
  add:{
    width: 40,
    backgroundColor: 'black',
    color: 'white',
    marginTop: 30,
  }
});