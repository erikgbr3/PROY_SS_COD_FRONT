import League from "../../../domain/entities/league"
import { View, Text, Image, StyleSheet } from 'react-native';

type cardProps = {
  league: League
}

export default function LeaguesCard(props: cardProps){
  return(
    <View style={styles.tarjeta}>
      <Image source={require('../../../../../assets/ligamx.jpg')} style={styles.imagen} />
      <Text style={styles.nombre}>{props.league.name}</Text>
      <View style={{paddingLeft: 20, width: '100%', paddingBottom: 20}}>
        <View style={styles.column}>
          <Text style={{color: '#0d47a1', fontWeight: '500', fontSize:16}}>Costo de Inscripción: </Text>
          <Text style={styles.equipo}>{props.league.cost}</Text>
        </View>
        <View style={styles.column}>
          <Text style={{color: '#0d47a1', fontWeight: '500', fontSize:16}}>Premiación: </Text>
          <Text style={styles.equipo}>{props.league.prize}</Text>
        </View>
        <View style={styles.column}>
          <Text style={{color: '#0d47a1', fontWeight: '500', fontSize:16}}>Fecha de Inicio: </Text>
          <Text style={styles.equipo}>{props.league.init}</Text>
        </View>
        <View style={styles.column}>
          <Text style={{color: '#0d47a1', fontWeight: '500', fontSize:16}}>Detalles: </Text>
          <Text style={styles.equipo}>{props.league.description}</Text>
        </View>
      </View>
    </View> 
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
    borderTopRightRadius:10,
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
  column:{
    flexDirection:'row', 
    justifyContent: "flex-start", 
    width:'80%',
    marginBottom: 2
  }
});
