import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FC, useEffect } from "react";
import { PositionsProvider, usePositionsState } from '../providers/positionsProvider';
import PositionTable from './components/positionTable';

type Props = {
  route: any,
  navigation: any,
}

const PositionsScreenView: React.FC<Props> = ({ route, navigation }) => {
  const {
    positions,
    getPositions

  } = usePositionsState();

  useEffect(() => {
    getPositions(route.params.leagueId);
  }, [])

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.headerTitle}>
        <Text style={styles.title}>Tabla de Posiciones</Text>
      </View>
      {positions && (
        <View style={styles.table}>
          <View style={[styles.row, styles.header]}>
            <View style={[styles.row, { width: '30%' }]}>
              <Text style={[styles.headerText]}>Equipo</Text>
            </View>
            <View style={[styles.row, { width: '10%' }]}>
              <Text style={[styles.headerText, { fontSize: 12 }]}>PG</Text>
            </View>
            <View style={[styles.row, { width: '10%' }]}>
              <Text style={[styles.headerText, { fontSize: 12 }]}>PE</Text>
            </View>
            <View style={[styles.row, { width: '10%' }]}>
              <Text style={[styles.headerText, { fontSize: 12 }]}>GF</Text>
            </View>
            <View style={[styles.row, { width: '10%' }]}>
              <Text style={[styles.headerText, { fontSize: 12 }]}>GC</Text>
            </View>
            <View style={[styles.row, { width: '10%' }]}>
              <Text style={[styles.headerText, { fontSize: 12 }]}>Dif</Text>
            </View>
            <View style={[styles.row, { width: '20%' }]}>
              <Text style={[styles.headerText]}>Pts</Text>
            </View>
          </View>
          {positions.map((position) => (
            <View key={position.id} style={styles.row}>
              <View style={[styles.row, { width: '30%' }]}>
                <Text style={[styles.cell, { fontWeight: 'bold', textAlign:'left', paddingLeft:10 }]}>{position.clubName}</Text>
              </View>
              <View style={[styles.row, { width: '10%' }]}>
                <Text style={[styles.cell, { fontSize: 12 }]}>{position.matchesWon}</Text>
              </View>
              <View style={[styles.row, { width: '10%' }]}>
                <Text style={[styles.cell, { fontSize: 12 }]}>{position.tiedMatches}</Text>
              </View>
              <View style={[styles.row, { width: '10%' }]}>
                <Text style={[styles.cell, { fontSize: 12 }]}>{position.gf}</Text>
              </View>
              <View style={[styles.row, { width: '10%' }]}>
                <Text style={[styles.cell, { fontSize: 12 }]}>{position.gc}</Text>
              </View>
              <View style={[styles.row, { width: '10%' }]}>
                <Text style={[styles.cell, { fontSize: 12 }]}>{position.dif}</Text>
              </View>
              <View style={[styles.row, { width: '20%' }]}>
                <Text style={[styles.cell, { fontWeight: 'bold' }]}>{position.points}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const PositionsScreen = (props: any) => (
  <PositionsProvider>
    <PositionsScreenView {...props} />
  </PositionsProvider>
)

export default PositionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#47baff',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0,
    borderColor: '#47baff',
    paddingVertical: 5,
  },
  header: {
    backgroundColor: '#82d5ff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#47baff',
    borderTopColor: '#47baff',
    fontWeight: 'bold',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
    color: '#0d47a1'
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 1
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    paddingLeft: 2,
    color: '#0d47a1'
  },
  headerTitle: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});