import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import SportField from "../../../domain/entities/sportfield";

type CardProps = {
    sportField : SportField,
}

export default function SportFieldCard (props : CardProps) {

    return (
        <View style={styles.container}>
            
            <TouchableOpacity style={styles.cardContainer}>
                <Image
                    source={{ uri: "https://i.pinimg.com/736x/29/3b/c5/293bc5455a53d6ae9662ca14b9f7a947.jpg" }}
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{props.sportField.name}</Text>
                    <View style={styles.cardInfo}>
                    <Text style={styles.info}>{props.sportField.ubication}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap', 
        flexDirection:'row', 
        
    },
    cardContainer: {
        backgroundColor: "#FFFFFF",
        padding: 1,
        borderRadius: 1,
        borderStyle: 'solid',
        borderWidth:.5,
        borderColor:'black',
        width:'75%',
        height:'auto',
        overflow: "hidden",
        margin: 5,
    },

    cardImage: {
        borderRadius: 5,
        width: '100%',
        height: 240,
        position: "relative",
        objectFit: "cover",
        margin: 0
    },

    cardContent: {
        marginLeft: 2,
    },

    cardTitle: {
        textAlign: 'left',
        fontSize: 32,
        color: '#111111'
    },

    cardInfo: {
        padding: 1,
       
    },

    info: {
        marginBottom: 2,
        textAlign: "left",
        color: 'grey',
        fontSize: 20,
    }
})