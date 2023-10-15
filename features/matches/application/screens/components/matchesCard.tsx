import {View, Text, StyleSheet, Image} from "react-native";
import Match from "../../../domain/entities/match";

type CardProps = {
    match: Match,
}

export default function MatchesCard(props: CardProps) {


    return (
        <View style={styles.container}>
            <View style={styles.date}>
                <Text style={styles.dateText}>{props.match.date}</Text>
            </View>
                <View style={styles.card}>
                <Text style={styles.nameClub}>{props.match.homeTeamId}</Text>
                <Text style={styles.score}>Puntuación: 
                    <Text style={styles.scoreText}>{props.match.scoreHome}</Text>
                </Text>
                <Text style={styles.nameClub}>{props.match.visitorTeamId}</Text>
                <Text style={styles.score}>Puntuación: 
                    <Text style={styles.scoreText}>{props.match.scoreVisitor}</Text>
                </Text>
                <Text style={styles.referee}>{props.match.refereeId}</Text>
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
        margin: 10,
        borderRadius: 50,
        backgroundColor: '#607D8B',
        alignContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
        flexDirection: 'row'
    },
    nameClub: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: 'white',
        marginLeft: 8,
        marginRight: 5,
    },
    score: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: 'white',
        marginRight: 2,
    },
    scoreText: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: 'white',
        marginRight: 5,
    },
    date: {
       
    },
    dateText: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: 'black',
        marginRight: 5,
    },
    referee: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: 'white',
        marginLeft: 5,
        marginRight: 8,
    },
});