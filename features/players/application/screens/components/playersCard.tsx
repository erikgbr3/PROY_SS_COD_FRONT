import {View, Text, StyleSheet, Image} from "react-native";
import Player from "../../../domain/entities/player";

type CardProps = {
    player: Player,
}

export default function PlayersCard(props: CardProps) {


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>{props.player.name}</Text>
                <Text style={styles.text}>{props.player.lastname}</Text>
                <Text style={styles.text}>{props.player.age}</Text>
                <Text style={styles.text}>{props.player.numberjersey}</Text>
                <Text style={styles.text}>{props.player.position}</Text>
                <Text style={styles.text}>{props.player.cellphone}</Text>
                <Text style={styles.text}>{props.player.curp}</Text>
                <Text style={styles.text}>{props.player.clubId}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
    },
    card: {
      backgroundColor: "#FFFFFF",
      padding: 1,
      borderRadius: 30,
      borderStyle: 'solid',
      borderWidth:.5,
      borderColor:'black',
      width:'75%',
      height:'auto',
      overflow: "hidden",
      margin: 5,
    },
    text: {
      marginBottom: 2,
      textAlign: "center",
      color: 'grey',
      fontSize: 20,
    },
});