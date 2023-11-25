import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Alert, PermissionsAndroid } from 'react-native';
import AuthScreen from './features/auth/application/screens/authScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigationTabs from './components/navigationTabs';
import AddUsersScreen from './features/users/application/screens/addUsersScreen';

const Stack = createNativeStackNavigator(); 

export default function App() {
  
/*   const requestInternetPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.INTERNET,
        {
          title: 'Permiso de uso de WiFI',
          message:
            'La aplicación necesita usar el wifi ' +
            'Para actualizar los datos.',
          buttonNeutral: 'Preguntame mas tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Se puede usar el wifi');
      } else {
        console.log('Permiso de wifi Denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestMediaPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Camera Permission',
          message:
            'La app necesita permiso de tus medios de imagens ' +
            'para poder elegir una foto de perfil.',
          buttonNeutral: 'Preguntarme mas tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Puedes usar los medios de imagenes');
      } else {
        console.log('Permiso de medios de imagenes denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de Localización',
          message:
            'La app necesita permiso de localicación ' +
            'para ofrecer datos de ligas cerca.',
          buttonNeutral: 'Preguntarme mas tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Puedes usar la localización');
      } else {
        console.log('Persmiso de localizacion denegado');
      }
    } catch (err) {
      console.warn(err);
    }
  }; 
  
  
  
  useEffect(() => {
    
    requestInternetPermission();
    requestMediaPermission();
    requestLocationPermission();
  }, []); */

  return (
      <NavigationContainer >
        <Stack.Navigator initialRouteName='Auth' screenOptions={{headerShown: false }} >
          <Stack.Screen name='Auth' component={AuthScreen} />
          <Stack.Screen name='Main' component={NavigationTabs}/>
          <Stack.Screen name='sign up' component={AddUsersScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
