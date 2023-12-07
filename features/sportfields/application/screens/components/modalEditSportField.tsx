import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Calendar } from 'react-native-calendars';
import SportField from "../../../domain/entities/sportfield";
import { EditSportFieldProvider, useEditSportFieldsState } from "../../providers/editSportFieldsProvider";


interface SportFieldEditViewProps {
  sportFieldEdit: SportField;
  onSaved: Function;
  onCancelEdit: Function;
  modalVisible: boolean;
}

const ModalEditSportField: React.FC<SportFieldEditViewProps> = ({
  sportFieldEdit,
  onSaved,
  onCancelEdit,
  modalVisible,
}) => {  
  const {
    sportField,
    errors,

    setSportField,
    setSportFieldProp,
    saveSportField,
  } = useEditSportFieldsState();

  useEffect(() => {
    setSportField(sportFieldEdit)
  }, [sportFieldEdit])

//   const [selected, setSelected] = useState<string | undefined>(sportField.init);
//   useEffect(() => {
//     setSelected(sportField.init); // Actualizar selected cuando cambie sportField.init
//   }, [sportField.init]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={()=>{
        onCancelEdit(null)
      }}
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
          >Edita el campo {sportField.name}</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
            <ScrollView style={{ width: 300 }}>
              <Text style={styles.tagInput}>Nombre del campo</Text>
              <TextInput
                style={styles.input}
                value={sportField.name || ''}
                onChangeText={(text) => { setSportFieldProp('name', text) }}
              />
              {errors?.name ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
              ) : null}
              <Text style={styles.tagInput}>Ubicación</Text>
              <TextInput
                style={styles.input}
                value={sportField.ubication || ''}
                onChangeText={(text) => { setSportFieldProp('ubication', text) }}
              />
              {errors?.ubication ? (
                <Text>{errors.ubication}</Text>
              ) : null}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300, marginTop: 10 }}>
                <View>
                  <TouchableOpacity
                    onPress={() =>  onCancelEdit(null)}
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
                    onPress={() => {saveSportField(onSaved)}}
                    style={{
                      backgroundColor: '#154477',
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      height: 50,
                    }}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Guardar Cambios</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const SportFieldEditScreen = (props: SportFieldEditViewProps) => (
  <EditSportFieldProvider>
    <ModalEditSportField {...props}/>
  </EditSportFieldProvider>
)

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
    marginTop: 20,
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

export default SportFieldEditScreen