import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SportFieldCard from './components/sportFieldCard';
import { useSportFieldsState, SportFieldsProvider } from '../providers/sportFieldsProvider';
import { FC, useEffect } from "react";
import { useLeaguesState } from '../../../leagues/application/providers/leaguesProvider';

type Props = {
  navigation: any,
}

const SportFieldsScreenView:FC<Props> = ({navigation}) => {

  const {
    sportFields,
    loading,

    getSportFields

  } = useSportFieldsState();

  // const LeaguesScreenView:FC<Props> = ({navigation}) => {
  //   const {
  //     leagues,
  //     getLeagues,
  //   } = useLeaguesState();
 

  const renderCards = () => {
    if(sportFields == null)
    {
      return null;
    }
    return sportFields?.map((sportField) => (<SportFieldCard key={`sportField${sportField.id}`} sportField={sportField} />
    ));
  }

  useEffect(() => {
    getSportFields();
  }, []);


    return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Encuentra tu liga Favorita</Text>
      </View>
      <ScrollView style={styles.container}>
          {/* <View style={styles.nav}>
              <Text style={styles.text}>Mira los campos deportivos</Text>
          </View> */}
        
          {renderCards()}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const SportFieldsScreen = (props: any) => (
  <SportFieldsProvider>
    <SportFieldsScreenView {...props} /> 
  </SportFieldsProvider>
)

export default SportFieldsScreen;

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
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    paddingLeft: 2,
    color: '#0d47a1'
  },
  header:{
    paddingTop: 20,
    paddingHorizontal: 15,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});