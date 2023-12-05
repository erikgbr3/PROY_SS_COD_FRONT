import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Position from '../../../domain/entities/tableposition';

type tableProps = {
  position: Position,
}

const PositionTable: React.FC<tableProps> = ({ position }) => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={[styles.row, styles.header]}>
          <Text style={styles.headerText}>Equipo</Text>
          <Text style={styles.headerText}>PG</Text>
          <Text style={styles.headerText}>PE</Text>
          <Text style={styles.headerText}>GF</Text>
          <Text style={styles.headerText}>GC</Text>
          <Text style={styles.headerText}>Dif</Text>
          <Text style={styles.headerText}>Pts</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>{position.clubName}</Text>
          <Text style={styles.cell}>{position.matchesWon}</Text>
          <Text style={styles.cell}>{position.tiedMatches}</Text>
          <Text style={styles.cell}>{position.gf}</Text>
          <Text style={styles.cell}>{position.gc}</Text>
          <Text style={styles.cell}>{position.dif}</Text>
          <Text style={styles.cell}>{position.points}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  header: {
    backgroundColor: '#f1f8ff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    fontWeight: 'bold',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 5,
  },
});

export default PositionTable;