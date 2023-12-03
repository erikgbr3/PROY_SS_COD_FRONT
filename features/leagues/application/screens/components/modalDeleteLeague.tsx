import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Calendar } from 'react-native-calendars';
import { useAddLeaguesState } from "../../providers/addLeaguesProvider";
import League from "../../../domain/entities/league";
import { EditLeagueProvider, useEditLeaguesState } from "../../providers/editLeaguesProvider";
import { DeleteLeagueProvider, useDeleteLeaguesState } from "../../providers/deleteLeaguesProvider";

interface LeagueDeleteViewProps {
  leagueDelete: League;
  onDeleted: Function;
  onCancelDelete: Function;
  modalVisible: boolean;
}

const ModalDeleteLeague: React.FC<LeagueDeleteViewProps> = ({
  leagueDelete,
  onDeleted,
  onCancelDelete,
  modalVisible,
}) => {
  const {
    league,
    errors,

    setLeague,
    setLeagueProp,
    deleteLeague,
  } = useDeleteLeaguesState();

  useEffect(() => {
    setLeague(leagueDelete)
  }, [leagueDelete])

  const handleDelete = () => {
    if (deleteLeague) {
      onDeleted(league)
      deleteLeague(() => {
        Alert.alert('Mensaje', 'La liga a sido eliminada correctamente', [
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
            <Text style={{ fontSize: 20, textAlign: 'center' }}>¿Quieres Eliminar {league.name}?</Text>
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

const LeagueDeleteScreen = (props: LeagueDeleteViewProps) => (
  <DeleteLeagueProvider>
    <ModalDeleteLeague {...props} />
  </DeleteLeagueProvider>
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

export default LeagueDeleteScreen