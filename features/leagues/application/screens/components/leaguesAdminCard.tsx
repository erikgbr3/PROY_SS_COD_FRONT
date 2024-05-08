import { TouchableOpacity } from "react-native";
import League from "../../../domain/entities/league"
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Modal } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


type cardProps = {
  leagueA: League,
  onEdit?: Function,
  onDelete?: Function,
  navigation: any
}
const LeaguesAdminCard: React.FC<cardProps> = ({ leagueA, onEdit, onDelete, navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleEdit = () => {
    setMenuVisible(false)
    if (onEdit) {
      onEdit(leagueA)
    }
  }

  const handleDelete = () => {
    setMenuVisible(false)
    if(onDelete){
      onDelete(leagueA)
    }
  }

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('partidos', {leagueId:leagueA.id, leagueName: leagueA.name })}
      onLongPress={() => setMenuVisible(true)}>
      <View style={styles.tarjeta}>
        <Image source={require('../../../../../assets/ligamx.jpg')} style={styles.imagen} />
        <Text style={styles.nombre}>{leagueA.name}</Text>
        <View style={{ paddingLeft: 20, width: '100%', paddingBottom: 20 }}>
          <View style={styles.column}>
            <Text style={{ color: '#0d47a1', fontWeight: '500', fontSize: 16 }}>Costo de Inscripción: </Text>
            <Text style={styles.equipo}>{leagueA.cost}</Text>
          </View>
          <View style={styles.column}>
            <Text style={{ color: '#0d47a1', fontWeight: '500', fontSize: 16 }}>Premiación: </Text>
            <Text style={styles.equipo}>{leagueA.prize}</Text>
          </View>
          <View style={styles.column}>
            <Text style={{ color: '#0d47a1', fontWeight: '500', fontSize: 16 }}>Fecha de Inicio: </Text>
            <Text style={styles.equipo}>{leagueA.init}</Text>
          </View>
          <View style={styles.column}>
            <Text style={{ color: '#0d47a1', fontWeight: '500', fontSize: 16 }}>Detalles: </Text>
            <Text style={styles.equipo}>{leagueA.description}</Text>
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
      </View>
    </TouchableOpacity>
  )
}

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
  icono: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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

export default LeaguesAdminCard