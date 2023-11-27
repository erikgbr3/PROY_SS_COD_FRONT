import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AddMatchProvider, useAddMatchState } from "../providers/addMatchProvider";
import { useClubsState } from "../providers/clubsProvider";


const AddMatchView = () => {

  const {
    loading,
    saving,
    match,
    homeTeamName,
    visitorTeamName,

    setMatchProp,
    saveMatch,

  } = useAddMatchState();
  
  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          <Text>Equipo Local</Text>
          <TextInput
            placeholder="Local"
            value={homeTeamName || ''}
            onChangeText={(text) => {
              setMatchProp('homeTeamName', text);
            }}
          ></TextInput>
        </View>

        <View>
          <Text>Equipo Visitante</Text>
          <TextInput
            placeholder="Visitante"
            value={visitorTeamName || ''}
            onChangeText={(text) => {
              setMatchProp('visitorTeamName', text)
            }} 
          ></TextInput>
        </View>

        <View>
          <Text>Fecha</Text>
          <TextInput
            placeholder="Fecha"
            value={match?.date || ''}
            onChangeText={(text) => {
              setMatchProp('date', text);
            }}
          ></TextInput>
        </View>

        <View>
          <Text>Hora</Text>
          <TextInput
            placeholder="Hora"
            value={match?.hour || ''}
            onChangeText={(text) => {
              setMatchProp('hour', text)
            }}
          ></TextInput>
        </View>

        <Button
          title="Registrar"
          onPress={() => saveMatch()}
        />
      </View>
      
    </ScrollView>
  );
}

const AddMatchScreen = (props: any) => {
  const { clubs } = useClubsState();

  return(
      <AddMatchProvider clubs={clubs}>
      <AddMatchView { ...props}/>
    </AddMatchProvider> 
  )
};

export default AddMatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  }
});