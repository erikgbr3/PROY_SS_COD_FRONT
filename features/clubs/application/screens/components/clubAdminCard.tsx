import React, { useState } from 'react';
import { Alert, Modal, Pressable, TouchableOpacity } from "react-native";
import { View, Text, Image, StyleSheet } from 'react-native';
import Club from '../../../domain/entities/club';
import { AntDesign } from '@expo/vector-icons';

type CardProps = {
  clubA: Club,
  onEdit?: Function,
  onDelete?: Function
}

const ClubAdminCard:React.FC<CardProps> = ({
    clubA, 
    onEdit,
    onDelete,
})=> {

  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
    const handleEdit = () =>{

        setModalVisible(!modalVisible)

        if(onEdit){
            onEdit(clubA);
        }
    }

    const handleDelete = () => {
      setMenuVisible(false)
      if(onDelete){
        onDelete(clubA)
      }
    }
  return (
    <View style={styles.tarjeta}>
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
      <TouchableOpacity
              style={styles.cardContainer}
              onLongPress={() => setModalVisible(true)}
          >      
          <Image source={{ uri: "https://previews.123rf.com/images/captainvector/captainvector1601/captainvector160116102/51723449-logotipo-del-club-de-f%C3%BAtbol.jpg" }} style={styles.imagen} />
          <Text style={styles.nombre}>{clubA.name}</Text>
          <View style={{ paddingLeft: 20, width: '100%', paddingBottom: 20 }}>
            <View style={styles.column}>
              <Text style={{ color: '#0d47a1', fontWeight: '500', fontSize: 16 }}>Localidad: </Text>
              <Text style={styles.equipo}>{clubA.locality}</Text>
            </View>
          </View>
      </TouchableOpacity>    
    </View>
  )
}

export default ClubAdminCard;

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#0d47a1',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imagen: {
    width: '100%',
    height: 180,
    marginBottom: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0d47a1',
  },
  equipo: {
    fontSize: 14,
    color: '#666',
  },
  column: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    width: '80%',
    marginBottom: 2
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
  containerClose:{
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: 190,
    // backgroundColor: 'green',
    position: 'absolute'
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    padding: 1,
    borderRadius: 1,
    borderStyle: 'solid',
    borderWidth:.5,
    borderColor:'black',
    width:'75%',
    height:'auto',
    overflow: "hidden",
    margin: 5,
},
});
