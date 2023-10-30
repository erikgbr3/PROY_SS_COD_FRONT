import {Button, StyleSheet, Text, TextInput, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import React from "react";
import LoginModal from "./components/loginModal";


export default function AuthScreen(){
    return (
        <View style={styles.container}>
        <View style={styles.circulo}></View>
        <Text style={styles.title}>Bienvenido a Fútbol Red</Text>
        <Text style={styles.subtitle}>Inicia sesión y accede a tu cuenta </Text>
        <LoginModal/>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 120,
    },
    title: {
      fontSize: 28,
      padding: 10,
      color: "#1B6BC1",
      fontWeight: "bold",
    },
    subtitle:{
      fontSize: 18,
      marginBottom: 30
    },
    circulo:{
      width:190,
      height: 190,
      borderRadius: 100,
      backgroundColor: "#1B6BC1",
      marginLeft: 350,
      marginTop: -80
    }
  });