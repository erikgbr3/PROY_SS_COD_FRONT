import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { View, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown'
import { useAddUsersState } from "../../providers/addUsersProvider";
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useAuthState } from "../../../../auth/application/providers/authProvider";


type Props = {
  navigation: any
}

const SignUpForm:React.FC<Props> = ({navigation}) => {

  const roles = [{ id: 1, rol: "Administrar Liga" }, 
  { id: 2, rol: "Manejar Club" }, 
  { id: 3, rol: "Ser Arbitro" }]
  const {
    loading,
    saving,
    success,
    user,
    setUserProp,
    saveUser,
    message,
    errors
  } = useAddUsersState();

  const{signIn} = useAuthState()

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await saveUser()
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(() => {
    if (success) {
      Alert.alert('Registro Exitoso', message, [
        {
          text: 'Aceptar',
          onPress: () => {
              navigation.navigate('Auth');            
          },
        },
      ]);
    } else if (message) {
      Alert.alert('Error', message);
    }
  }, [success, message]);

  return (
    <View style={styles.container}>
      <Text style={styles.tagInput}>Nombre de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Jose Juan"
        value={user.username || undefined}
        onChangeText={(text) => { setUserProp('username', text) }}
      />
      {errors?.username ? (
        <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
      ) : null}
      <Text style={styles.tagInput}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="abc@xyz.com"
        value={user.email || undefined}
        onChangeText={(text) => { setUserProp('email', text) }}
      />
      {errors?.email ? (
        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
      ) : null}
      <Text style={styles.tagInput}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={!showPassword} //para mostrar o no la contraseña
        value={user.password || undefined}
        onChangeText={(text) => { setUserProp('password', text) }}
      />
      {errors?.password ? (
        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
      ) : null}
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{position: "absolute", right: 50, top: 200}}>
        <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#1B6BC1" />
      </TouchableOpacity>
      <Text>Elige que deseas hacer en Fútbol Red</Text>

      <SelectDropdown
        data={roles}
        buttonStyle={{ width: '100%', borderRadius: 20, marginTop: 10 }}
        rowTextStyle={{ fontSize: 20 }}
        defaultButtonText="¿Que quieres Hacer?"
        onSelect={(selectedItem, index) => {
          if (selectedItem) {
            setUserProp('roleId', selectedItem.id);
            console.log(selectedItem.id, index);
          } else {
            Alert.alert('Advertencia', 'Debes seleccionar tu rol para poder registrarte')
          }
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem ? selectedItem.rol : "¿Qué quieres Hacer?";
        }}
        rowTextForSelection={(item, index) => {
          return item.rol
        }}
      />

      <TouchableOpacity style={styles.login} onPress={handleLogin}>
        <Text style={styles.loginText}>Registrarme</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.text}>¿ya tienes una cuenta?
          <Text style={styles.enlace} onPress={() => { navigation.navigate('Auth' as never) }}> Inicia Sesión</Text>
        </Text>
      </View>
    </View>
  )
}

export default SignUpForm;

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
  login: {
    backgroundColor: '#1B6BC1',
    borderRadius: 20,
    marginTop: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tagInput: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
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