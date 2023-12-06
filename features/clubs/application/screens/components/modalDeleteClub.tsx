import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Calendar } from 'react-native-calendars';
import Club from "../../../domain/entities/club";
import { DeleteClubProvider, useDeleteClubsState } from "../../providers/deleteClubsProvider";

interface ClubDeleteViewProps {
  clubDelete: Club;
  onDeleted: Function;
  onCancelDelete: Function;
  modalVisible: boolean;
}

const ModalDeleteClub: React.FC<ClubDeleteViewProps> = ({
  clubDelete,
  onDeleted,
  onCancelDelete,
  modalVisible,
}) => {
  const {
    club,
    errors,

    setClub,
    setClubProp,
    deleteClub,
  } = useDeleteClubsState();

  useEffect(() => {
    setClub(clubDelete)
  }, [clubDelete])

  const handleDelete = () => {
    if (deleteClub) {
      onDeleted(club)
      deleteClub(() => {
        Alert.alert('Mensaje', 'El club a sido eliminado correctamente', [
          {
            text: 'Muy bien',
            onPress: () => onCancelDelete(null),
          }
        ])

        // onDeleted(league)
      })
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onCancelDelete(null)
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '100%', padding: 5 }}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>¿Quieres Eliminar {club.name}?</Text>
          </View>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={[styles.modalOption, { color: 'red', fontSize: 20, fontWeight: 'bold' }]}>Si, Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onCancelDelete(null) }}>
            <Text style={[styles.modalOption, { color: 'gray' }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const ClubDeleteScreen = (props: ClubDeleteViewProps) => (
  <DeleteClubProvider>
    <ModalDeleteClub {...props} />
  </DeleteClubProvider>
)

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    padding: 10
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    elevation: 10,
    width: '100%',
  },
  modalOption: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default ClubDeleteScreen;