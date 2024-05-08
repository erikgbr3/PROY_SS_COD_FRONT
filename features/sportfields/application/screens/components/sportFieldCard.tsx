import React, { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import SportField from "../../../domain/entities/sportfield";
import { MaterialIcons } from '@expo/vector-icons';

type CardProps = {
    sportField : SportField,
    onEdit?: Function,
    onDelete?: Function
}

const SportFieldCard: React.FC<CardProps> = ({
    sportField, 
    onEdit, 
    onDelete
}) => {

    const [menuVisible, setMenuVisible] = useState(false);

  const handleEdit = () => {
    setMenuVisible(false)
    if (onEdit) {
      onEdit(sportField)
    }
  }

  const handleDelete = () => {
    setMenuVisible(false)
    if(onDelete){
      onDelete(sportField)
    }
  }

    return (
        <View style={styles.container}>
            
            <TouchableOpacity style={styles.cardContainer} onLongPress={() => setMenuVisible(true)}>
                <Image
                    source={{ uri: "https://i.pinimg.com/736x/29/3b/c5/293bc5455a53d6ae9662ca14b9f7a947.jpg" }}
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{sportField.name}</Text>
                    <View style={styles.cardInfo}>
                    <Text style={styles.info}>{sportField.ubication}</Text>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={menuVisible}
                    >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                        <View style={{borderBottomColor: 'gray', borderBottomWidth: 1, width: '100%', padding:5}}>
                            <Text style={{ fontSize: 20, textAlign:'center' }}>¿Qué Deseas Realizar?</Text>
                        </View>
                        <View style={{position: "absolute", right:20, bottom: 80}}>
                            <TouchableOpacity onPress={() => { setMenuVisible(false) }}>
                            <MaterialIcons name="cancel" size={24} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleEdit}>
                            <Text style={[styles.modalOption, { color: '#1d99ff' }]}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete}>
                            <Text style={[styles.modalOption, { color: 'red' }]}>Eliminar</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>
        </View>
    );
}

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

    modalContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        alignItems: 'center',
        elevation: 10,
        width: '100%',
    },
    modalOption: {
        fontSize: 18,
        marginBottom: 5,
    },
})

export default SportFieldCard;