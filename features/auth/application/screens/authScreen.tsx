import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import React from "react";
import { useNavigation } from '@react-navigation/native';
import LoginModal from "./components/loginModal";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../providers/authProvider";


const  AuthScreenView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circulo}></View>
      <Text style={styles.title}>Bienvenido a Fútbol Red</Text>
      <Text style={styles.subtitle}>Inicia sesión y accede a tu cuenta </Text>
      <LoginModal />
      <StatusBar />
    </View>
  );
};

const AuthScreen = (props: any) => (
    <AuthScreenView {...props}/>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 28,
    padding: 10,
    color: "#1B6BC1",
    fontWeight: "bold",
    marginTop: 320
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30
  },
  circulo: {
    width: 190,
    height: 190,
    borderRadius: 100,
    backgroundColor: "#1B6BC1",
    position: "absolute",
    top: -70,
    right: -100
  }
});

export default AuthScreen;

