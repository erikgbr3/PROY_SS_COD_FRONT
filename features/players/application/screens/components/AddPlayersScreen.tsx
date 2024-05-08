import React, { FC, useState } from 'react';
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AddPlayerProvider, useAddPlayerState } from '../../providers/addPlayerProvider';


const AddPlayerView = () => {

  const {
    message,
    loading,
    saving,
    success,
    player,
    errors,

    setPlayerProp,
    savePlayer

  } = useAddPlayerState();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listado de Jugadores</Text>
      </View>
      <ScrollView>
        <View style={styles.form}>
          <ScrollView>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '47%', padding: 5, margin: 5 }}>
                <Text style={styles.text}>Nombre</Text>
                <View style={styles.inputContent}>
                  <TextInput
                    style={[styles.textInput, (errors?.name ? styles.textError : null)]}
                    placeholder="Nombre"
                    value={player?.name || ''}
                    onChangeText={(text) => {
                      setPlayerProp('name', text);
                    }}
                    textContentType='name'
                  ></TextInput>
                  {errors?.name ? (
                    <Text style={styles.textError}>{errors.name}</Text>
                  ) : null}
                </View>
              </View>

              <View style={{ width: '47%', padding: 5, margin: 5 }}>
                <Text style={styles.text}>Apellido</Text>
                <View style={styles.inputContent}>
                  <TextInput
                    style={[styles.textInput, (errors?.lastname ? styles.textError : null)]}
                    placeholder="Apellido"
                    value={player?.lastname || ''}
                    onChangeText={(text) => {
                      setPlayerProp('lastname', text)
                    }}
                    textContentType='name'
                  ></TextInput>
                  {errors?.lastname ? (
                    <Text style={styles.textError}>{errors.lastname}</Text>
                  ) : null}
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>

              <View style={{ width: '47%', padding: 5, margin: 5 }}>
                <Text style={styles.text}>Edad</Text>
                <View style={styles.inputContent}>
                  <TextInput
                    style={[styles.textInput, (errors?.age ? styles.textError : null)]}
                    placeholder="Edad"
                    value={player?.age || ''}
                    onChangeText={(text) => {
                      setPlayerProp('age', text);
                    }}
                    textContentType='none'
                  ></TextInput>
                  {errors?.age ? (
                    <Text style={styles.textError}>{errors.age}</Text>
                  ) : null}
                </View>
              </View>

              <View style={{ width: '47%', padding: 5, margin: 5 }}>
                <Text style={styles.text}>Número del jersey</Text>
                <View style={styles.inputContent}>
                  <TextInput
                    style={[styles.textInput, (errors?.numberjersey ? styles.textError : null)]}
                    placeholder="No. Jersey"
                    value={player?.numberjersey || ''}
                    onChangeText={(text) => {
                      setPlayerProp('numberjersey', text)
                    }}
                    textContentType='none'
                  ></TextInput>
                  {errors?.numberjersey ? (
                    <Text style={styles.textError}>{errors.numberjersey}</Text>
                  ) : null}
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '47%', padding: 5, margin: 5 }}>
                <Text style={styles.text}>Posición</Text>
                <View style={styles.inputContent}>
                  <TextInput
                    style={[styles.textInput, (errors?.position ? styles.textError : null)]}
                    placeholder="Delantero"
                    value={player?.position || ''}
                    onChangeText={(text) => {
                      setPlayerProp('position', text)
                    }}
                    textContentType='none'
                  ></TextInput>
                  {errors?.position ? (
                    <Text style={styles.textError}>{errors.position}</Text>
                  ) : null}
                </View>
              </View>

              <View style={{ width: '47%', padding: 5, margin: 5 }}>
                <Text style={styles.text}>Número de teléfono</Text>
                <View style={styles.inputContent}>
                  <TextInput
                    style={[styles.textInput, (errors?.cellphone ? styles.textError : null)]}
                    placeholder="Número de teléfono"
                    value={player?.cellphone || ''}
                    onChangeText={(text) => {
                      setPlayerProp('cellphone', text)
                    }}
                    textContentType='telephoneNumber'
                  ></TextInput>
                  {errors?.cellphone ? (
                    <Text style={styles.textError}>{errors.cellphone}</Text>
                  ) : null}
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>


              <View style={{ width: '47%', padding: 5, margin: 5 }}>
                <Text style={styles.text}>Curp</Text>
                <View style={styles.inputContent}>
                  <TextInput
                    style={[styles.textInput, (errors?.curp ? styles.textError : null)]}
                    placeholder="Curp"
                    value={player?.curp || ''}
                    onChangeText={(text) => {
                      setPlayerProp('curp', text)
                    }}
                    textContentType='none'
                  ></TextInput>
                  {errors?.curp ? (
                    <Text style={styles.textError}>{errors.curp}</Text>
                  ) : null}
                </View>
              </View>

              <View style={{ width: '47%', padding: 5, margin: 5 }}>
                <Text style={styles.text}>Club</Text>
                <View style={styles.inputContent}>
                  <TextInput
                    style={[styles.textInput, (errors?.clubId ? styles.textError : null)]}
                    placeholder="Club"
                    value={String(player?.clubId) || ''}
                    onChangeText={(text) => {
                      setPlayerProp('clubId', text)
                    }}
                    textContentType='none'
                  ></TextInput>
                  {errors?.clubId ? (
                    <Text style={styles.textError}>{errors.clubId}</Text>
                  ) : null}
                </View>
              </View>
            </View>


            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                savePlayer()
              }}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </ScrollView>
      {message ? (
        <Text style={success ? styles.success : styles.alert}>{message}</Text>
      ) : null}
    </View>
  );
}

const AddPlayerScreen = (props: any) => {

  return (
    <AddPlayerProvider >
      <AddPlayerView {...props} />
    </AddPlayerProvider>
  )
};

export default AddPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    paddingLeft: 2,
    color: '#0d47a1'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  success: {
    borderRadius: 3,
    backgroundColor: 'green',
    color: '#fff',
    textAlign: 'justify'
  },
  alert: {
    borderRadius: 3,
    backgroundColor: 'orange',
    textAlign: 'justify',
    //border: '1px solid #cc0'
  },
  form: {
    marginTop: 10,
    marginLeft: 22,
    marginRight: 22,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: .5,
    borderColor: 'black',
  },
  text: {
    fontSize: 14,
    marginTop: 2,
    marginBottom: 2
  },
  inputContent: {
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: .5,
    borderColor: 'black',
    marginTop: 1,
    marginBottom: 1,
  },
  textInput: {
    marginLeft: 4,
    fontSize: 12,
    color: "gray",
    marginTop: 2,
    marginBottom: 2,
  },
  button: {
    borderRadius: 9,
    marginTop: 5,
    width: '100%',
    backgroundColor: 'blue',
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  textError: {
    color: 'red'
  }
});