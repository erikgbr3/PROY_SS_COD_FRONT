import React from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, Alert, Image } from "react-native"
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { useAuthState } from "../../providers/authProvider";

type Props = {
  navigation: any
}

const LoginModal: React.FC<Props> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    auth,
    token,
    user,
    success,
    setAuthProp,
    signIn,
    resetForm,
    message,
    errors,
    error
  } = useAuthState();

  const handleLogin = async () => {
    try {
      await signIn()
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(() => {
    if (success) {
      if(user.roleId == 1){
        navigation.replace('Home Admin' as never);
        resetForm()
      }else if(user.roleId == 2){
        navigation.replace('Home Club Manager' as never);
        resetForm()
      }else{
        navigation.replace('Home Referee' as never);
        resetForm()
      }
    }
    if (error) {
      Alert.alert('error', message);
    }
  }, [success, error]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.tagInput}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="abc@xyz.com"
        onChangeText={(text) => { setAuthProp('email', text) }}
        value={auth.email}
      />
      {errors?.email ? (
        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
      ) : null}
      <Text style={styles.tagInput}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={!showPassword}
        onChangeText={(text) => { setAuthProp('password', text) }}
        value={auth.password}
      />
      {errors?.password ? (
        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
      ) : null}
      <TouchableOpacity 
        onPress={() => setShowPassword(!showPassword)} 
        style={{ position: "absolute", right: 50, top: 130 }}>
        <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#1B6BC1" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.login, { backgroundColor: (auth.email && auth.password) ? '#1B6BC1' : '#c2dbf5' }]}
        disabled={!auth.email || !auth.password} 
        onPress={handleLogin}>
        <Text 
        style={[styles.loginText, {color: (auth.email && auth.password) ? "white" : "#154e8f"}]}
        >Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.moreOptions}>
        <Text style={styles.moreOptionsText}>O Inicia Sesión Como Invitado</Text>
      </View>
      <View style={styles.socialMedia}>
        <TouchableOpacity style={styles.invitado} onPress={() => { navigation.navigate('Main' as never) }}>
          <Text style={styles.invitadoText}>Modo Invitado</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>¿No tienes una cuenta?
          <Text style={styles.enlace} onPress={() => { navigation.navigate('sign up' as never) }}> Regístrate Aquí</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 40, 
    padding: 32, 
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
  login: {
    backgroundColor: '#1B6BC1',
    borderRadius: 20,
    marginTop: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  invitado: {
    backgroundColor: '#277dd0',
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
  invitadoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagInput: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4
  },
  icon: {
    width: 40,
    height: 40,
  },
  moreOptions: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  moreOptionsText: {
    fontSize: 18,
    color: '#154477',
    fontWeight: '500'
  },
  socialMedia: {
    alignItems: "center",
    marginTop: 30,
    justifyContent: "center",
  },
  footer: {
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16
  },
  enlace: {
    color: "#1B6BC1",
    fontWeight: "800"
  }
});

export default LoginModal;