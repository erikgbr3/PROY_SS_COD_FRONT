import { StatusBar } from "expo-status-bar";
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FC, useEffect, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { AddSportFieldProvider, useAddSportFieldState } from "../providers/addSportFieldProvider";

const AddSportFieldScreenView = () => {

  const {
    loading,
    sportField,
    saving,
    setSportFieldProp,
    saveSportField,
    message,
    errors,
    
  } = useAddSportFieldState();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Estos son los campos</Text>
      </View>
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
            >Agrega un nuevo campo</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
              <Text style={styles.tagInput}>En que comunidad se encuentra</Text>
              <TextInput
                style={styles.input}
                value={sportField.ubication || ''}
                onChangeText={(text) => { setSportFieldProp('ubication', text) }}
              />
              {errors?.ubication ? (
                <Text style ={{fontSize: 10, color: 'red'}}>{errors.ubication}</Text>
              ) : null}
              <Text style={styles.tagInput}>Nombre del campo</Text>
              <TextInput
                style={styles.input}
                placeholder="2023/01/01"
                value={sportField.name || ''}
                onChangeText={(text) => { setSportFieldProp('name', text) }}
              />
              {errors?.name?(
                <Text style ={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
              ) : null}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300, marginTop: 10 }}>
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
                      saveSportField();
                    }}
                    style={{
                      backgroundColor: '#154477',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      height: 50,
                    }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Agregar</Text>
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

const AddSportFieldScreen = (props: any) => (
  <AddSportFieldProvider>
    <AddSportFieldScreenView {...props} />
  </AddSportFieldProvider>
)

export default AddSportFieldScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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