import React from "react";
import { AddClubProvider, useAddClubState } from "../../providers/addClubProvider";
import { useClubsState } from "../../providers/clubsProvider";
import { MaterialIcons } from '@expo/vector-icons';
import { FC, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { EditClubProvider, useEditClubState } from "../../providers/editClubProvider";
import Club from "../../../domain/entities/club";

interface ClubEditViewProps{
    clubEdit: Club,
    onSaved: Function,
    onCancelEdit: Function,
    modalVisible: boolean,
}

const ClubEditView:React.FC<ClubEditViewProps> = ({
        clubEdit,
        onSaved,
        modalVisible,
        onCancelEdit, 
    }) => {

    const {
      loading,
      club,
      saving,
      setClubProp,
      saveClub,
      setClub,
      message,
      errors,
      
    } = useEditClubState();

    useEffect(()=>{
        setClub(clubEdit)
    }, [clubEdit]);
  
    //const [modalVisible, setModalVisible] = useState(false);
  
    return (
      
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>{
            onCancelEdit(null);
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
              >Edita tu equipo</Text>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                <Text style={styles.tagInput}>Nombre del club</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={String(club.name) || ''}
                  onChangeText={(text) => { setClubProp('name', text) }}
                />
                {errors?.name ? (
                  <Text style ={{fontSize: 10, color: 'red'}}>{errors.name}</Text>
                ) : null}
                <Text style={styles.tagInput}>Localidad a la que pertenece</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={String(club.locality) || ''}
                  onChangeText={(text) => { setClubProp('locality', text) }}
                />
                {errors?.locality ? (
                  <Text style ={{fontSize: 10, color: 'red'}}>{errors.locality}</Text>
                ) : null}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
                  <View>
                    <Text style={styles.tagInput}>Campo de juego</Text>
                    <TextInput
                      style={[styles.input, styles.inputDoble]}
                      defaultValue={club.fieldId !== undefined ? club.fieldId.toString() : ''}
                      onChangeText={(number) => { setClubProp('fieldId', number) }}
                    />
                    {errors?.fieldId ? (
                      <Text style ={{fontSize: 10, color: 'red'}}>{errors.fieldId}</Text>
                    ) : null}
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300, marginTop: 10 }}>
                  <View>
                    <TouchableOpacity
                      onPress={() => onCancelEdit(null)}
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
                        saveClub(onSaved);
                      }}
                      style={{
                        backgroundColor: '#154477',
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        height: 50,
                      }}>
                      <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Actualizar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
    );
  }
  
  const ClubEditScreen = (props: ClubEditViewProps) => (
    <EditClubProvider>
      <ClubEditView {...props} />
    </EditClubProvider>
  )
  
  export default ClubEditScreen;
  
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