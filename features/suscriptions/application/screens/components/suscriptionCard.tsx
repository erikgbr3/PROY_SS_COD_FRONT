import React, { StyleSheet, Text, View,  } from 'react-native';
import { IconButton } from 'react-native-paper';
import Suscription from '../../../domain/entities/suscription';
import { FC } from 'react';

type CardProps ={
    suscription: Suscription,
    onEdit?: Function,
    onDelete?: Function,
}

const SuscriptionCard: FC<CardProps>= ({suscription, onEdit, onDelete}) => {
      
  //console.log(device.model);

  const handleEdit = () => {
    if(onEdit){      
       onEdit(suscription);
    }
  }

  const handleDelete = () => {
    if(onDelete){      
       onDelete(suscription);
    }
  }
  
    return (
      <View>
      <View style={styles.row}>
        <Text style={styles.column}>
          {suscription.leagueId}
        </Text>
        <Text style={[styles.column2, styles.boldText]}>
          {suscription.clubId}
        </Text>
        <View style={styles.actions}>
          <IconButton
            icon="pencil"
            iconColor='blue'
            size={20}
            onPress={
              handleEdit
            }
          />
          <IconButton
            icon="delete"
            iconColor="red"
            size={20}
            //onPress={() => { // Acción al presionar el botón de eliminar}}
            onPress={
              handleDelete
            }
          />
        </View>
      </View>
      <View style={styles.horizontalLine} />
    </View>

);
}

export default SuscriptionCard;

const styles = StyleSheet.create({
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20
},
column: {
  flex: 1,
  fontSize: 14,
  marginLeft: 20, 
  marginTop: 12
},
column2: {
  flex: 1,
  fontSize: 14,
  marginTop: 12
},
actions: {
  flexDirection: 'row',
},
header: {
  fontWeight: 'bold',
},
boldText: {
  fontWeight: 'bold',
},
horizontalLine: {
  borderBottomColor: 'gray',
  borderBottomWidth: 1,
  marginVertical: 8,
},
});

  