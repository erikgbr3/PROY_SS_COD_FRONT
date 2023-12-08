import React, { useState, FC } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import Player from "../../../domain/entities/player";
import { MaterialIcons } from '@expo/vector-icons';

type CardProps = {
    player: Player,
    onEdit?: Function,
    onDeleted?: Function
}

const PlayersCardAdmin: FC<CardProps> = ({
    player,
    onEdit,
    onDeleted
}) => {

    const [menuVisible, setMenuVisible] = useState(false);

    const showModal = () => {
        setMenuVisible(!menuVisible);
    }

    const handleEdit = () => {
        setMenuVisible(!menuVisible);
        if (onEdit) {
            onEdit(player);
        }
    }

    const handleDelete = () => {
        setMenuVisible(!menuVisible);
        if (onDeleted) {
            onDeleted(player)
        }
    }


    return (
        <TouchableOpacity onLongPress={showModal}>
            <View style={styles.tarjeta}>
                <Image source={require('../../../../../assets/player.jpg')} style={styles.imagen} />
                <View>
                    <Text style={{ fontSize: 24, color: "#777777", fontWeight: 'bold' }}>{player.numberjersey}</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{player.name} {player.lastname}</Text>
                <Image source={{ uri: "https://previews.123rf.com/images/captainvector/captainvector1601/captainvector160116102/51723449-logotipo-del-club-de-f%C3%BAtbol.jpg" }}
                    style={styles.club} />
                <Text>{player.position}</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={menuVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1, width: '100%', padding: 5 }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>¿Qué Deseas Realizar?</Text>
                        </View>
                        <View style={{ position: "absolute", right: 20, bottom: 80 }}>
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
    );
}

export default PlayersCardAdmin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: "#FFFFFF",
        padding: 1,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: .5,
        borderColor: 'black',
        width: 380,
        height: 'auto',
        overflow: "hidden",
        margin: 5,
    },
    text: {
        marginBottom: 2,
        textAlign: "center",
        color: 'grey',
        fontSize: 20,
    },
    modalContainer: {
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
    tarjeta: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10,
        margin: 10,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 10,
        width: 150
      },
      imagen: {
        width: "100%",
        height: 180,
        marginBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      },
      club: {
        width: 20,
        height: 20,
        position: 'absolute',
        bottom: 50,
        right: 10
      },
});