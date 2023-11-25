import React from 'react';
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
                <View style={styles.cardData}>
                    <View style={styles.data}>
                        <Text style={styles.nameClub}>{props.match.homeTeamName}</Text>
                    </View>
                    <View> 
                            <Text style={styles.scoreText}>{props.match.scoreHome}</Text>
                    </View>
                </View>
                
                <View style={styles.cardData}>
                    <View>
                        <Text style={styles.nameClub}>{props.match.visitorTeamName}</Text>
                    </View>
                    
                    <View> 
                            <Text style={styles.scoreText}>{props.match.scoreVisitor}</Text>
                    </View>
                </View>
                
                <View style={styles.cardData}>
                  <Text style={styles.referee}>{props.match.refereeId}</Text>  
                </View>    
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
      width: 380,
      height:'auto',
      overflow: "hidden",
      margin: 5,
    },
    cardData:{
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
    },
    data:{
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
    },
    nameClub: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: 'grey',
        marginLeft: 8,
        marginRight: 5,
    },
    scoreText: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 30,
        color: 'grey',
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
        color: 'grey',
        marginLeft: 5,
        marginRight: 8,
    },
});