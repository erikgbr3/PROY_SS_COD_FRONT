import {StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, Alert, Image } from "react-native"
import React from "react";

export default function LoginModal(){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = () =>{
    }

    const mainScreen = () =>{
    }

    return (
    <View style={styles.container}>
        <Text style={styles.tagInput}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="abc@xyz.com"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={styles.tagInput}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
            <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={styles.moreOptions}>
          <Text style={styles.moreOptionsText}>O Inicia Sesión Como Invitado</Text>
        </View> 
        <View style={styles.socialMedia}>
          <TouchableOpacity style={styles.invitado} onPress={mainScreen}>
              <Text style={styles.invitadoText}>Modo Invitado</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text}>¿No tienes una cuenta?<Text style={styles.enlace}> Registrate Aquí</Text></Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', // Color de fondo de la vista
        borderRadius: 40, // Bordes redondeados (opcional)
        padding: 32, // Relleno interno (ajusta según tus necesidades)
        height: "100%",
        width: "100%",
        ...Platform.select({
          ios: {
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          },
          android: {
            elevation: 4,
          },
        }),
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'rgba(198,198,199, 0.5)',
      borderWidth: 1,
      borderRadius: 16,
      marginBottom: 10,
      padding: 10,
    },
    login:{
        backgroundColor: '#1B6BC1',
        borderRadius: 20,
        marginTop: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    invitado:{
      backgroundColor: '#4e9ae2',
        borderRadius: 20,
        marginTop: 10,
        height: 40,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    invitadoText:{
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    tagInput:{
        fontSize: 12,
        color: "gray",
        marginBottom: 4
    },
    icon:{
        width: 40,
        height: 40,
    },
    moreOptions:{
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20
    },
    moreOptionsText:{
      fontSize: 18,
      color: '#154477',
      fontWeight: '500'
    },
    socialMedia: {
      alignItems: "center",
      marginTop: 30,
      justifyContent: "center",
    },
    footer:{
      marginTop: 120,
      justifyContent: "center",
      alignItems: "center"
    },
    text:{
      fontSize: 16
    },
    enlace: {
      color: "#1B6BC1",
      fontWeight: "800"
    }
  });