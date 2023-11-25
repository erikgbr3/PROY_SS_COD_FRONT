import React from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AddPlayerProvider, useAddPlayerState } from '../providers/addPlayerProvider';

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
      <View style={styles.nav}>
            <Text style={styles.textNav}>Añadir Jugador</Text>
        </View>
      <ScrollView> 
      <View style={styles.form}>
        <ScrollView>
        <View>
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
          ): null}
          </View>
        </View>

        <View>
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
          ): null}
          </View> 
        </View>

        <View>
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
          ): null}
          </View>  
        </View>

        <View>
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
          ): null}
          </View>   
        </View>

        <View>
          <Text style={styles.text}>Posición</Text>
          <View style={styles.inputContent}>
            <TextInput
            style={[styles.textInput, (errors?.position ? styles.textError : null)]}
            placeholder="No. Posición"
            value={player?.position || ''}
            onChangeText={(text) => {
              setPlayerProp('position', text)
            }}
            textContentType='none'
          ></TextInput>
          {errors?.position ? (
            <Text style={styles.textError}>{errors.position}</Text>
          ): null}
          </View>   
        </View>

        <View>
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
          ): null}
          </View>   
        </View>

        <View>
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
          ): null}
          </View>   
        </View>

        <View>
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
          ): null}
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
          <Text style={success? styles.success :styles.alert}>{message}</Text>
        ): null} 
    </View>
  );
}

const AddPlayerScreen = (props: any) => {

  return(
      <AddPlayerProvider >
        <AddPlayerView { ...props}/>
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
  nav:{
    backgroundColor: '#003c8f',
    height:60,
  },
  textNav:{
    marginTop: 15,
    marginLeft: 16,
    fontSize: 26,
    color: '#fff'
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: .5,
    borderColor: 'black',
  },
  text: {
    fontSize: 22,
    marginTop: 2,
    marginBottom: 2
  },
  inputContent:{
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: .5,
    borderColor: 'black',
    marginTop: 1,
    marginBottom: 1,
  },
  textInput: {
    marginLeft: 4,
    fontSize: 22,
    color: "gray",
    marginTop: 2,
    marginBottom: 2,
  },
  button: {
    borderRadius: 9,
    marginTop: 5,
    width: 150,
    backgroundColor: 'blue',
    marginBottom: 5,
  },
  buttonText:{
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  textError: {
    color: 'red'
  }
});