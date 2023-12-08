import React, { FC, useEffect } from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet, TextInput, Button } from "react-native";
import Player from "../../../domain/entities/player";
import { EditPlayerProvider, useEditPlayerState } from "../../providers/editPlayerProvider";

interface PlayerEditViewProps {
  playerEdit: Player,
  onSaved: Function,
  menuVisible: boolean,
  onCancelEdit: Function,
}

const PlayerEditView: FC<PlayerEditViewProps> = ({playerEdit, onSaved, menuVisible, onCancelEdit}) => {

  const {
    loading,
    saving,
    player,

    setPlayerProp,
    savePlayer,
    setPlayer,

  } = useEditPlayerState();

  useEffect(() => {
    setPlayer(playerEdit)
  }, [playerEdit]);

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
          <Text>Nombre:</Text> 
          <TextInput
            placeholder={player.name}
            value={player?.name || ''}
            onChangeText={(text) => {
              setPlayerProp('name', text);
            }}
          ></TextInput>
      </View>
      <View>
          <Text>Apellido: </Text>
          <TextInput
            placeholder={player.lastname}
            value={player?.lastname || ''}
            onChangeText={(text) => {
              setPlayerProp('lastname', text);
            }}
          ></TextInput>
        </View>

      <View>
        <Text>Edad:</Text>
        <TextInput
            placeholder={player.age}
            value={player?.age || ''}
            onChangeText={(text) => {
              setPlayerProp('age', text);
            }}
          ></TextInput>
      </View>
        <View>
          <Text>Número de Jersey:</Text>
          <TextInput
            placeholder={player.numberjersey}
            value={player?.numberjersey || ''}
            onChangeText={(text) => {
              setPlayerProp('numberjersey', text)
            }}
          ></TextInput>
        </View>

        <View>
        <Text>Posición:</Text>
        <TextInput
            placeholder={player.position}
            value={player?.position || ''}
            onChangeText={(text) => {
              setPlayerProp('position', text);
            }}
          ></TextInput>
      </View>

      <View>
        <Text>Número de Teléfono:</Text>
        <TextInput
            placeholder={player.cellphone}
            value={player?.cellphone || ''}
            onChangeText={(text) => {
              setPlayerProp('cellphone', text);
            }}
          ></TextInput>
      </View>

      <View>
        <Text>Curp:</Text>
        <TextInput
            placeholder={player.curp}
            value={player?.curp || ''}
            onChangeText={(text) => {
              setPlayerProp('curp', text);
            }}
          ></TextInput>
      </View>

        <Button
          title="Guardar"
          onPress={() => savePlayer(onSaved)}
        />
    </Modal>
    </View>
  </View>
 )
}

const PlayerEditScreen = (props: any) => {

 return (
  <EditPlayerProvider >
    <PlayerEditView {...props}/>
  </EditPlayerProvider>
 )
};

export default PlayerEditScreen;

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