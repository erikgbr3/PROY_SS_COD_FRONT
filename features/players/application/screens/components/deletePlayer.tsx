import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import Player from "../../../domain/entities/player";
import { DeletePlayerProvider, useDeletePlayerState } from "../../providers/deletePlayerProvider";

interface PlayerDeleteViewProps {
  playerDelete: Player;
  onDeleted: Function;
  onCancelDelete: Function;
  menuVisible: boolean;
}

const DeletePlayer: React.FC<PlayerDeleteViewProps> = ({
  playerDelete,
  onDeleted,
  onCancelDelete,
  menuVisible,
}) => {
  const {
    player,
    errors,

    setPlayer,
    setPlayerProp,
    deletePlayer
  } = useDeletePlayerState()

  useEffect(() => {
    setPlayer(playerDelete)
  }, [playerDelete])

  const handleDelete = () => {
    if (deletePlayer) {
      onDeleted(player)
      deletePlayer(() => {
        Alert.alert('Mensaje', 'El jugador ha sido eliminado correctamente', [
          {
            text: 'Muy bien',
            onPress: () => onCancelDelete(null),
          }
        ])
      })
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={menuVisible}
      onRequestClose={() => {
        onCancelDelete(null)
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '100%', padding: 5 }}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>¿Quieres Eliminar a {player.name}?</Text>
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

const PlayerDeleteScreen = (props: PlayerDeleteViewProps) => (
  <DeletePlayerProvider>
    <DeletePlayer {...props} />
  </DeletePlayerProvider>
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

export default PlayerDeleteScreen;