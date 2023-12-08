import React, { useState } from 'react';
import { Alert, Modal, Pressable, TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet } from 'react-native';
import Club from '../../../domain/entities/club';
import { AntDesign } from '@expo/vector-icons';

type CardProps = {
  clubA: Club,
  onEdit?: Function,
  onDelete?: Function,
  navigation: any
}

const ClubAdminCard: React.FC<CardProps> = ({
  clubA,
  onEdit,
  onDelete,
  navigation
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const handleEdit = () => {

    setModalVisible(!modalVisible)

    if (onEdit) {
      onEdit(clubA);
    }
  }

  const handleDelete = () => {
    setMenuVisible(false)
    if (onDelete) {
      onDelete(clubA)
    }
  }
  return (
    <TouchableOpacity
      onLongPress={() => setModalVisible(true)}
      onPress={() => navigation.navigate('sus', {clubId:clubA.id, clubName: clubA.name })}
    >
      <View style={styles.tarjeta}>
        <Image source={{ uri: "https://previews.123rf.com/images/captainvector/captainvector1601/captainvector160116102/51723449-logotipo-del-club-de-f%C3%BAtbol.jpg" }} style={styles.imagen} />
        <Text style={styles.nombre}>{clubA.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.equipo}>{clubA.locality}</Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.containerClose}>
              <Pressable
                style={styles.close}
                onPress={() => setModalVisible(!modalVisible)}>
                {/* <Text style={styles.textStyle}>Cerar</Text> */}
                <AntDesign name="close" size={24} color="gray" />
              </Pressable>
            </View>

            <Text style={styles.modalText}>¿Qué deseas hacer?</Text>
            <Pressable
              style={[styles.button, styles.buttonUpdate]}
              onPress={handleEdit}>
              <Text style={styles.textStyle}>Editar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonDelete]}
              onPress={handleDelete}>
              <Text style={styles.textStyle}>Eliminar</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    </TouchableOpacity>

  )
}

export default ClubAdminCard;

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: .9,
    shadowRadius: 10,
    elevation: 10,
    width:'100%'
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0d47a1',
  },
  equipo: {
    fontSize: 16,
    color: '#0578ff',
  },
  //del modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  close: {
    margin: 10
  },
  buttonUpdate: {
    backgroundColor: '#2196F3',
    margin: 4,
    width: 120
  },
  buttonDelete: {
    backgroundColor: '#FA2C2C',
    margin: 4,
    width: 120
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
  containerClose: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: 190,
    // backgroundColor: 'green',
    position: 'absolute'
  },
});
