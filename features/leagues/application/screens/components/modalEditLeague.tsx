import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Calendar } from 'react-native-calendars';
import { useAddLeaguesState } from "../../providers/addLeaguesProvider";
import League from "../../../domain/entities/league";
import { EditLeagueProvider, useEditLeaguesState } from "../../providers/editLeaguesProvider";

interface LeagueEditViewProps {
  leagueEdit: League;
  onSaved: Function;
  onCancelEdit: Function;
  modalVisible: boolean;
}

const ModalEditLeague: React.FC<LeagueEditViewProps> = ({
  leagueEdit,
  onSaved,
  onCancelEdit,
  modalVisible,
}) => {  
  const {
    league,
    errors,

    setLeague,
    setLeagueProp,
    saveLeague,
  } = useEditLeaguesState();

  useEffect(() => {
    setLeague(leagueEdit)
  }, [leagueEdit])

  const [selected, setSelected] = useState<string | undefined>(league.init);
  useEffect(() => {
    setSelected(league.init); // Actualizar selected cuando cambie league.init
  }, [league.init]);

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
          >Edita tu liga {league.name}</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
            <ScrollView style={{ width: 300 }}>
              <Text style={styles.tagInput}>Nombre de la liga</Text>
              <TextInput
                style={styles.input}
                value={league.name || ''}
                onChangeText={(text) => { setLeagueProp('name', text) }}
              />
              {errors?.name ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
              ) : null}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
                <View>
                  <Text style={styles.tagInput}>Costo de Inscripción</Text>
                  <TextInput
                    style={[styles.input, styles.inputDoble]}
                    value={league.cost.toString()}
                    onChangeText={(text) => { setLeagueProp('cost', parseInt(text) )}}
                  />
                  {errors?.cost ? (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.cost}</Text>
                  ) : null}
                </View>
                <View >
                  <Text style={styles.tagInput}>Premiación</Text>
                  <TextInput
                    style={[styles.input, styles.inputDoble]}
                    value={league.prize || ''}
                    onChangeText={(text) => { setLeagueProp('prize', text) }}
                  />
                  {errors?.prize ? (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.prize}</Text>
                  ) : null}
                </View>
              </View>
              <Text style={styles.tagInput}>Fecha de inicio</Text>
              <Calendar
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(198,198,199, 0.5)',
                  borderRadius: 20,
                  width: 300,
                }}
                enableSwipeMonths={true}
                theme={{
                  arrowColor: '#154477',
                  todayTextColor: '#1B6BC1',
                }}
                onDayPress={day => {
                  setSelected(day.dateString);
                  setLeagueProp('init', day.dateString)
                }}
                markedDates={{
                  [league.init || '2023-12-31']: { selected: true, disableTouchEvent: true, selectedColor: '#154477' }
                }}
              />
              {errors?.prize ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.prize}</Text>
              ) : null}
              <Text style={styles.tagInput}>Descripción</Text>
              <TextInput
                style={styles.input}
                value={league.description || ''}
                onChangeText={(text) => { setLeagueProp('description', text) }}
              />
              {errors?.description ? (
                <Text>{errors.description}</Text>
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
                    onPress={() => {saveLeague(onSaved)}}
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

const LeagueEditScreen = (props: LeagueEditViewProps) => (
  <EditLeagueProvider>
    <ModalEditLeague {...props}/>
  </EditLeagueProvider>
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

export default LeagueEditScreen