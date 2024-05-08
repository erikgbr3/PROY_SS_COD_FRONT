import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SuscriptionsProvider, useSuscriptionsState } from '../providers/suscriptionsProvider';
import SuscriptionCard from './components/suscriptionCard';
import AddSuscriptionView from './components/addSuscription';
import SuscriptionEditScreen from './components/suscriptionEdit';
import SuscriptionDeleteScreen from './components/deleteSuscription';

type Props = {
  route:any,
  navigation: any,
}

const SuscriptionScreenView:React.FC<Props> = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  
  const { 
    suscription, 
    loading,
    suscriptionSelected,
    suscriptionSelectedDelete,

    //actions
    getSuscriptions,
    setSuscriptionSelected,
    setSuscriptionDelected,
    onUpdatedSuscription,
    onSavedSuscription,
    onDeleteSuscription
  } = useSuscriptionsState();

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // Realiza la lógica de filtrado y actualización del estado de los usuarios aquí
  };

  useEffect(() => {
    getSuscriptions(route.params.clubId);
  }, []);

  const renderCards = () => {
    if (suscription == null) {
      return null;
    }

    const filteredSuscriptions = suscription.filter(
      (suscription) =>
        `${suscription.leagueId}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredSuscriptions.map((suscription) => <SuscriptionCard key={suscription.id} suscription={suscription} onEdit={setSuscriptionSelected} onDelete={setSuscriptionDelected}/>);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <Text>cargando</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerScrollView}>
        {renderCards()}
      </ScrollView>
      <AddSuscriptionView modalVisible={modalVisible} setModalVisible={setModalVisible} onSaved = {onSavedSuscription} />

      {!!suscriptionSelected ? (
      <SuscriptionEditScreen suscriptionEdit={suscriptionSelected} modalVisible={!!suscriptionSelected} onSaved={onUpdatedSuscription} onCancelEdit={setSuscriptionSelected} />
      ) : null}


       {!!suscriptionSelectedDelete ? (
      <SuscriptionDeleteScreen suscriptionDelete={suscriptionSelectedDelete} modalVisible={!!suscriptionSelectedDelete} onDeleted={onDeleteSuscription} onCancelDelete={setSuscriptionDelected}/>

      ) : null}

       </View>
  );
}

const SuscriptionScreen = (props: any) => (
  <SuscriptionsProvider>
    <SuscriptionScreenView {...props} />
  </SuscriptionsProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  containerScrollView: {
    justifyContent: 'center',
    padding: 20,
  },
  searchBar: {
    marginTop: 20,
    backgroundColor: '#e0e0e0', 
  },
  searchInput: {
    color: '#000', 
  },
  addButton: {
    position: 'absolute',
    bottom: 20, 
    right: 20,
    backgroundColor: '#0559B7',
    borderRadius: 50,
    elevation: 5,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default SuscriptionScreen;
