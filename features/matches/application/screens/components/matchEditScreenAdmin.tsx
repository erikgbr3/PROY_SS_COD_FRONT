import React, { FC, useEffect } from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet, TextInput, Button } from "react-native";
import { EditMatchProvider, useEditMatchState } from "../../providers/editMatchProvider";
import { useClubsState } from "../../providers/clubsProvider";
import Match from "../../../domain/entities/match";

interface MatchEditViewProps {
  matchEdit: Match,
  onSaved: Function,
  menuVisible: boolean,
  onCancelEdit: Function,
}

const MatchEditAdminView: FC<MatchEditViewProps> = ({matchEdit, onSaved, menuVisible, onCancelEdit}) => {

  const {
    loading,
    saving,
    match,
    homeTeamName,
    visitorTeamName,

    setMatchProp,
    saveMatch,
    setMatch

  } = useEditMatchState();

  useEffect(() => {
    setMatch(matchEdit)
  }, [matchEdit]);

 return (
  <View style={styles.container}>
    <View style={styles.modal}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={menuVisible}
        onRequestClose={() => {
          onCancelEdit(null)
        }}
    >
      <View>
          <Text>Equipo Local:</Text> 
          <TextInput
            placeholder={match.homeTeamName}
            value={match?.homeTeamName || ''}
            onChangeText={(text) => {
              setMatchProp('homeTeamName', text);
            }}
          ></TextInput>
      </View>
      <View>
          <Text>Goles: </Text>
          <TextInput
            placeholder="Goles Local"
            value={String(match?.scoreHome) || ''}
            onChangeText={(text) => {
              setMatchProp('scoreHome', text);
            }}
          ></TextInput>
        </View>

      <View>
        <Text>Equipo Visitante:</Text>
        <TextInput
            placeholder={match.visitorTeamName}
            value={match?.visitorTeamName || ''}
            onChangeText={(text) => {
              setMatchProp('visitorTeamName', text);
            }}
          ></TextInput>
      </View>
        <View>
          <Text>Goles:</Text>
          <TextInput
            placeholder="Goles visitante"
            value={String(match?.scoreVisitor) || ''}
            onChangeText={(text) => {
              setMatchProp('scoreVisitor', text)
            }}
          ></TextInput>
        </View>

        <View>
        <Text>Fecha:</Text>
        <TextInput
            placeholder={match.date}
            value={match?.date || ''}
            onChangeText={(text) => {
              setMatchProp('date', text);
            }}
          ></TextInput>
      </View>

      <View>
        <Text>Hora:</Text>
        <TextInput
            placeholder={match.hour}
            value={match?.hour || ''}
            onChangeText={(text) => {
              setMatchProp('hour', text);
            }}
          ></TextInput>
      </View>

        <Button
          title="Guardar"
          onPress={() => saveMatch(onSaved)}
        />
    </Modal>
    </View>
  </View>
 )
}

const matchEditScreenAdmin = (props: any) => {
  const { clubs } = useClubsState();

 return (
  <EditMatchProvider clubs={clubs}>
    <MatchEditAdminView {...props}/>
  </EditMatchProvider>
 )
};

export default matchEditScreenAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 35,
    marginLeft: 0,
    marginRight: 0,
  },
  modal: {

  }
});