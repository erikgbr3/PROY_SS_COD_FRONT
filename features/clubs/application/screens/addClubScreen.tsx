import React from "react";
import { AddClubProvider, useAddClubState } from "../providers/addClubProvider";
import { useClubsState } from "../providers/clubsProvider";
import { MaterialIcons } from '@expo/vector-icons';
import { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import ClubAdminCard from "./components/clubAdminCard";
import ClubEditScreen from "./components/clubEditModal";
import ClubDeleteScreen from "./components/modalDeleteClub";
import SelectDropdown from 'react-native-select-dropdown'

type Props = {
  navigation: any,
}

const AddClubScreenView:React.FC<Props> = ({navigation}) => {

  const {
    loading,
    club,
    saving,
    message,
    errors,
    clubs,
    sportFields,
    success,
    clubsSelected,
    clubSelectedDeleted,

    setClubSelectedDeleted,
    setClubProp,
    saveClub,
    getClubs,
    getSportFields,
    setClubSelected,
    onUpdatedClub,
    onDeleteClub,

  } = useAddClubState();


  const handleFields = () => {
    navigation.navigate('CamposAdd')  
    setModalVisible(false)
  }

  const renderCards = () => {
    if (clubs == null) {
      return null
    }
    return clubs?.map((clubA) =>
      <ClubAdminCard
        key={clubA.id}
        clubA={clubA}
        onEdit={setClubSelected}
        onDelete={setClubSelectedDeleted}
        navigation={navigation}
      />
    )
  }

  useEffect(() => {
    getClubs();
  }, [])

  useEffect(() => {
    getSportFields();
  }, [])

  useEffect(() => {
  }, [clubs]);

  const [modalVisible, setModalVisible] = useState(false);
  //const [selected, setSelected] = useState('');
  useEffect(() => {
    if (success) {
      Alert.alert('Registro Exitoso', message);
      setModalVisible(false);
    } else if (message) {
      Alert.alert('Error', message);
    }
  }, [success, message]);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Estos son tus Clubs</Text>
      </View>
      <ScrollView style={{ marginLeft: 20, marginRight: 20 }}>
        {renderCards()}

        {!!clubsSelected ? (
          <ClubEditScreen
            clubEdit={clubsSelected}
            modalVisible={!!clubsSelected}
            onSaved={setClubSelected}
            onCancelEdit={setClubSelected}
          />
        ) : null}
        {!!clubSelectedDeleted ? (
          <ClubDeleteScreen
            clubDelete={clubSelectedDeleted}
            modalVisible={!!clubSelectedDeleted}
            onDeleted={onDeleteClub}
            onCancelDelete={setClubSelectedDeleted}
          />
        ) : null}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{
              fontSize: 28,
              fontWeight: '800',
              textAlign: 'center',
              paddingLeft: 2,
              color: '#0d47a1',
              marginBottom: 5
            }}
            >Crea un club y dirigelo</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
              <Text style={styles.tagInput}>Nombre del club</Text>
              <TextInput
                style={styles.input}
                defaultValue={String(club.name) || ''}
                onChangeText={(text) => { setClubProp('name', text) }}
              />
              {errors?.name ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
              ) : null}
              <Text style={styles.tagInput}>Localidad a la que pertenece</Text>
              <TextInput
                style={styles.input}
                defaultValue={String(club.locality) || ''}
                onChangeText={(text) => { setClubProp('locality', text) }}
              />
              {errors?.locality ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.locality}</Text>
              ) : null}
              <View style={{justifyContent: 'space-between', width: 300 }}>
                <View>
                  <Text style={[styles.tagInput, {width: 300}]}>Campo de juego</Text>
                  {/* <TextInput
                      style={[styles.input, styles.inputDoble]}
                      defaultValue={club.fieldId !== undefined ? club.fieldId.toString() : ''}
                      onChangeText={(number) => { setClubProp('fieldId', number) }}
                    />  */}
                  <SelectDropdown
                    data={sportFields}
                    buttonStyle={{ width: '100%', borderRadius: 20, marginTop: 10 }}
                    rowTextStyle={{ fontSize: 20 }}
                    defaultButtonText="Elige el campo en el que jugaran"
                    onSelect={(selectedItem, index) => {
                      if (selectedItem) {
                        setClubProp('fieldId', selectedItem.id);
                        console.log(selectedItem.id, index);
                      } else {
                        Alert.alert('Advertencia', 'Debes seleccionar tu rol para poder registrarte')
                      }
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem ? selectedItem.name : "¿Qué quieres Hacer?";
                    }}
                    rowTextForSelection={(item, index) => {
                      return item.name
                    }}
                  />
                  {errors?.fieldId ? (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.fieldId}</Text>
                  ) : null}
                </View>
                <Text style={{fontSize:10}}>Si el campo no esta disponible <Text style={{color:'#0d47a1'}} 
                  onPress={handleFields}>agregalo aquí</Text></Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300, marginTop: 30 }}>
                <View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{
                      backgroundColor: '#fff',
                      borderColor: '#1B6BC1',
                      borderWidth: 1,
                      borderRadius: 5,
                      height: 50,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                    }}>
                    <Text style={{
                      color: '#1B6BC1',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                      Cancelar</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      saveClub();
                    }}
                    style={{
                      backgroundColor: '#154477',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      height: 50,
                    }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Crear</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={26} color="white" />
      </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const AddClubScreen = (props: any) => (
  <AddClubProvider>
    <AddClubScreenView {...props} />
  </AddClubProvider>
)

export default AddClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    paddingLeft: 2,
    color: '#0d47a1'
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 15,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 120,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    height: '100%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  button: {
    borderRadius: 50,
    padding: 10,
    elevation: 10,
    position: "absolute",
    right: 20,
    bottom: 90
  },
  buttonOpen: {
    backgroundColor: '#154477',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'rgba(198,198,199, 0.5)',
    borderWidth: 1,
    borderRadius: 16,
    marginBottom: 10,
    padding: 10
  },
  inputDoble: {
    width: 140,
  },
  tagInput: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
  },
});