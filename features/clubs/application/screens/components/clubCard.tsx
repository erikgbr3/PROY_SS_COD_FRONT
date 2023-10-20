import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Club from "../../../domain/entities/club";

type CardProps = {
    club : Club,
}

export default function ClubCard (props : CardProps) {

    return (
        <View style={styles.container}>
            
            <TouchableOpacity style={styles.cardContainer}>
                <Image
                    source={{ uri: "https://previews.123rf.com/images/captainvector/captainvector1601/captainvector160116102/51723449-logotipo-del-club-de-f%C3%BAtbol.jpg" }}
                    style={styles.cardImage}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{props.club.name}</Text>
                    <View style={styles.cardInfo}>
                    <Text style={styles.info}>{props.club.locality}</Text>
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