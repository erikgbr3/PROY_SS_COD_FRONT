import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Pressable, Modal, Alert } from "react-native";
import Club from "../../../domain/entities/club";
import { AntDesign } from '@expo/vector-icons';
import ClubEditScreen from './clubEditModal';

type CardProps = {
  club: Club,
}

const ClubCard: React.FC<CardProps> = ({ club }) => {
  return (
    <View style={styles.tarjeta}>
    <Image source={{ uri: "https://previews.123rf.com/images/captainvector/captainvector1601/captainvector160116102/51723449-logotipo-del-club-de-f%C3%BAtbol.jpg" }} 
      style={styles.imagen} />
    <Text style={styles.nombre}>{club.name}</Text>
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.equipo}>{club.locality}</Text>
    </View>
  </View>
  );
}

export default ClubCard;

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
  }
})