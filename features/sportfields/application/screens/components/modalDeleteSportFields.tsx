import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { DeleteSportFieldProvider, useDeleteSportFieldsState } from "../../providers/deleteSportFieldsProvider";
import SportField from "../../../domain/entities/sportfield";

interface SportFieldDeleteViewProps {
  sportFieldDelete: SportField;
  onDeleted: Function;
  onCancelDelete: Function;
  modalVisible: boolean;
}

const ModalDeleteSportField: React.FC<SportFieldDeleteViewProps> = ({
  sportFieldDelete,
  onDeleted,
  onCancelDelete,
  modalVisible,
}) => {
  const {
    sportField,
    errors,

    setSportField,
    setSportFieldProp,
    deleteSportField,
  } = useDeleteSportFieldsState();

  useEffect(() => {
    setSportField(sportFieldDelete)
  }, [sportFieldDelete])

  const handleDelete = () => {
    if (deleteSportField) {
      onDeleted(sportField)
      deleteSportField(() => {
        Alert.alert('Mensaje', 'El campo a sido eliminado correctamente', [
          {
            text: 'Muy bien',
            onPress: () => onCancelDelete(null),
          }
        ])

        // onDeleted(sportField)
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
            <Text style={{ fontSize: 20, textAlign: 'center' }}>¿Quieres Eliminar {sportField.name}?</Text>
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

const SportFieldDeleteScreen = (props: SportFieldDeleteViewProps) => (
  <DeleteSportFieldProvider>
    <ModalDeleteSportField {...props} />
  </DeleteSportFieldProvider>
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

export default SportFieldDeleteScreen