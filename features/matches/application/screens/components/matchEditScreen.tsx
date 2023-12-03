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

const MatchEditView: FC<MatchEditViewProps> = ({matchEdit, onSaved, menuVisible, onCancelEdit}) => {

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
          <Text>Equipo Local: {match.homeTeamName}</Text> 
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
        <Text>Equipo Visitante: {match.visitorTeamName}</Text>
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

        <Button
          title="Guardar"
          onPress={() => saveMatch(onSaved)}
        />
    </Modal>
    </View>
  </View>
 )
}

const MatchEditScreen = (props: any) => {
  const { clubs } = useClubsState();

 return (
  <EditMatchProvider clubs={clubs}>
    <MatchEditView {...props}/>
  </EditMatchProvider>
 )
};

export default MatchEditScreen;

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