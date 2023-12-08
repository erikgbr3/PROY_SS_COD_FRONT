import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Match from "../../../domain/entities/match";

type CardProps = {
    match: Match,
    onEdit?: Function,
}

const MatchesCardReferee: FC<CardProps> = ({ match, onEdit }) => {


    const [menuVisible, setMenuVisible] = useState(false);

    const showModal = () => {
        setMenuVisible(!menuVisible);
    }

    const handleEdit = () => {
        setMenuVisible(!menuVisible);
        if (onEdit) {
            onEdit(match);
        }
    }

    return (
        <TouchableOpacity onLongPress={showModal}>
            <View style={[styles.card]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.cardData}>
                        <View style={styles.data}>
                            <Text style={styles.nameClub}>{match.homeTeamName}</Text>
                        </View>
                        <View>
                            <Text style={styles.scoreText}>{match.scoreHome}</Text>
                        </View>
                    </View>
                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#074dc6', fontWeight: '500' }}>VS</Text>
                    </View>
                    <View style={styles.cardData}>
                        <View>
                            <Text style={styles.nameClub}>{match.visitorTeamName}</Text>
                        </View>
                        <View>
                            <Text style={styles.scoreText}>{match.scoreVisitor}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                    <Text style={{ fontSize: 16 }}>{match.hour}</Text>
                </View>
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
                    </View>
                </View>
            </Modal>

        </TouchableOpacity>
    );
}

export default MatchesCardReferee;

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
        borderRadius: 10,
        width: 320,
        height: 'auto',
        overflow: "hidden",
        margin: 5,
        shadowColor: '#0d47a1',
        shadowOffset: { width: 0, height: 30 },
        shadowOpacity: 10,
        shadowRadius: 5,
        elevation: 10,
    },
    cardData: {
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
        width: '45%'
    },
    data: {
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
    },
    nameClub: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: '#0d47a1',
        marginLeft: 8,
        marginRight: 5,
    },
    scoreText: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 30,
        color: '#074dc6',
        marginRight: 5,
    },
    referee: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: 'grey',
        marginLeft: 5,
        marginRight: 8,
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
});