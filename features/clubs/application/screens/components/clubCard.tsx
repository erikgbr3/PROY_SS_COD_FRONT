import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Pressable, Modal, Alert } from "react-native";
import Club from "../../../domain/entities/club";
import { AntDesign } from '@expo/vector-icons';
import ClubEditScreen from './clubEditModal';

type CardProps = {
    club : Club,
}

const ClubCard:React.FC<CardProps> = ({
    club,
})=> {
    //const [modalVisible, setModalVisible] = useState(false);
    // const handleEdit = () =>{

    //     setModalVisible(!modalVisible)

    //     if(onEdit){
    //         onEdit(club);
    //     }
    // }

    return (
        <View style={styles.container}>
            {/* <Modal
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
                            {/*<AntDesign name="close" size={24} color="gray" />
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
                        onPress={() => {}}>
                        <Text style={styles.textStyle}>Eliminar</Text>
                        </Pressable>
                        
                    </View>
                </View>
            </Modal>            */}
        
                    
                    <Image
                        source={{ uri: "https://previews.123rf.com/images/captainvector/captainvector1601/captainvector160116102/51723449-logotipo-del-club-de-f%C3%BAtbol.jpg" }}
                        style={styles.cardImage}
                    />
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{club.name}</Text>
                        <View style={styles.cardInfo}>
                            <Text style={styles.info}>{club.locality}</Text>
                        </View>
                    </View>
                
        </View>
    );
}

export default ClubCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap', 
        flexDirection:'row', 
        
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

    cardImage: {
        borderRadius: 5,
        width: '100%',
        height: 240,
        position: "relative",
        objectFit: "cover",
        margin: 0
    },

    cardContent: {
        marginLeft: 2,
    },

    cardTitle: {
        textAlign: 'left',
        fontSize: 32,
        color: '#111111'
    },

    cardInfo: {
        padding: 1,
       
    },

    info: {
        marginBottom: 2,
        textAlign: "left",
        color: 'grey',
        fontSize: 20,
    },
    /////
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
      }
})