import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Player from "../../../domain/entities/player";
import { FC } from "react";

type CardProps = {
  player: Player,
  onEdit?: Function,
}

const PlayersCard: FC<CardProps> = ({
  player,
  onEdit

}) => {


  return (
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
  );
}

export default PlayersCard;

const styles = StyleSheet.create({
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