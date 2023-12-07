import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import Player from "../../../domain/entities/player";
import { FC } from "react";

type CardProps = {
    player: Player,
    onEdit?: Function,
}

const PlayersCard:FC<CardProps> = ({
    player,
    onEdit

}) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>{player.name}</Text>
                <Text style={styles.text}>{player.lastname}</Text>
                <Text style={styles.text}>{player.age}</Text>
                <Text style={styles.text}>{player.numberjersey}</Text>
                <Text style={styles.text}>{player.position}</Text>
                <Text style={styles.text}>{player.cellphone}</Text>
                <Text style={styles.text}>{player.curp}</Text>
                <Text style={styles.text}>{player.clubId}</Text>
            </View>
        </View>
    );
}

export default PlayersCard;

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
      borderWidth:.5,
      borderColor:'black',
      width: 380,
      height:'auto',
      overflow: "hidden",
      margin: 5,
    },
    text: {
      marginBottom: 2,
      textAlign: "center",
      color: 'grey',
      fontSize: 20,
    },
});