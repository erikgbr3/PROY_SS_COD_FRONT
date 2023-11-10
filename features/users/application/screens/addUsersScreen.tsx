import { Text,  StyleSheet, View, Platform, StatusBar,} from "react-native";
import { AddUsersProvider } from "../providers/addUsersProvider"
import { SafeAreaView } from "react-native";
import SignUpForm from "./components/signUpForm";

const AddUsersScreenView = () => {

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.circulo}/>
      <View style={styles.show}>
        <Text style={styles.title}>Registrate a Fútbol Red</Text>
        <Text style={styles.subtitle}>Con Fútbol Red, todo es más fácil.</Text>
        <SignUpForm />
      </View>
    </SafeAreaView> 
  )
}

const AddUsersScreen = (props: any) => (
  <AddUsersProvider>
    <AddUsersScreenView {...props}/>
  </AddUsersProvider>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  show: {
    flex: 1,
    paddingTop: 100
  },
  title: {
    fontSize: 32,
    padding: 10,
    color: "#1B6BC1",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle:{
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  circulo:{
    width:150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#1B6BC1",
    position: "absolute",
    left: -40,
    top: -50,
  },
})

export default AddUsersScreen;