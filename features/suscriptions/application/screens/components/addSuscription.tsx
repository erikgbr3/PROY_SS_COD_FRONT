import React, { useState } from "react";
import { View, Modal, Text, TextInput, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { AddSuscriptionProvider, useAddSuscriptionState } from "../../providers/addSuscriptionsProvider";

interface AddSuscriptionViewProps {
  modalVisible: boolean;
  onSaved: Function;
  setModalVisible: (visible: boolean) => void;
}

const AddSuscriptionView: React.FC<AddSuscriptionViewProps> = ({ modalVisible, onSaved, setModalVisible }) => {
  const {
    message,
    loading,
    saving,
    success,
    suscription,
    errors,

    setSuscriptionProp,
    saveSuscription,
  } = useAddSuscriptionState();

  const handleSaveSuscription = async () => {

    saveSuscription(() => {
      setModalVisible(false);

      setTimeout(() => {
        Alert.alert('Suscripcion Registrada', 'La suscripcion se ha registrado correctamente', [
          { text: 'OK', onPress: () => { } },
        ]);
      }, 500); 

      onSaved()
    })
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Registrar Suscripcion</Text>
            <View>
              {/*<Text style={success ? styles.success : styles.alert}>{message}</Text>*/}

              <Text style={styles.label}>Liga:</Text>
              <TextInput
                style={[styles.textInput, (errors?.clubId ? styles.textError : null)]}
                placeholder=" Ingresa la liga a la que quiere suscribirse"
                value={String(suscription?.leagueId) || ""}
                onChangeText={(text) => {
                  setSuscriptionProp("leagueId", text);
                }}

              ></TextInput>
              {errors?.leagueId ? (
                <Text style={styles.textError}>{errors.leagueId}</Text>
              ) : null}
            </View>

            <View>
              <Text style={styles.label}>Club:</Text>
              <TextInput
                style={[styles.textInput, (errors?.clubId ? styles.textError : null)]}
                placeholder=" Ingresa el modelo del dispositivo"
                value={String(suscription?.clubId) || ""}
                onChangeText={(text) => {
                  setSuscriptionProp("clubId", text);
                }}
              ></TextInput>
              {errors?.clubId ? (
                <Text style={styles.textError}>{errors.clubId}</Text>
              ) : null}
            </View>


            {/* <View>
              <Text style={styles.label}>Categoria a la que pertenece:</Text>
              <RNPickerSelect
                onValueChange={(value) => setSuscriptionProp("deviceCategoryId", value)}
                items={[
                  { label: 'Celular', value: '1' },
                  { label: 'Tableta', value: '2' },
                  { label: 'PC', value: '3' },
                  { label: 'Laptop', value: '4' },

                ]}
                style={{
                  inputIOS: styles.textInput,
                  inputAndroid: styles.textInput,
                }}
                value={suscription?.clubId}
                placeholder={{
                  label: 'Elige una categoria',
                  value: null,
                }}
              />
              {errors?.deviceCategoryId ? <Text style={styles.textError}>{errors.deviceCategoryId}</Text> : null}
            </View> */}

            <View style={styles.buttonsContainer}>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonSaving]}
                //onPress={() => saveDevice(onSaved)}
                onPress={handleSaveSuscription}
              >
                <Text style={styles.textStyle}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AddSuscriptionScreen = (props: AddSuscriptionViewProps) => (
  <AddSuscriptionProvider>
    <AddSuscriptionView {...props} />
  </AddSuscriptionProvider>
);

const { width } = Dimensions.get("window"); // Obtiene el ancho de la pantalla

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    borderWidth: .5,
    height: 35,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: width * 0.7, // Ajusta el ancho según tus necesidades
    marginTop: 20, // Espacio entre los botones y los campos de texto
  },
  button: {
    flex: 1, // Esto hará que ambos botones tengan el mismo ancho
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 5, // Espacio entre los botones
  },
  buttonSaving: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#E60B26",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  alert: {
    backgroundColor: 'orange',
  },
  success: {
    backgroundColor: 'green',
    color: '#fff'
  },
  textError: {
    color: 'red',
  },
  button1: {
    marginTop: 50,
    width: 200,
    marginLeft: 50,
  },
});

export default AddSuscriptionScreen;
