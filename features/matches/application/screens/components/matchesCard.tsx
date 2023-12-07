import React, { FC, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Modal} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import Match from "../../../domain/entities/match";

type CardProps = {
    match: Match,
}

const MatchesCard: FC<CardProps> = ({match}) => {


    return (
            <View style={styles.container}>
                    <View style={styles.card}>
                        <View style={styles.cardData}>
                            <View style={styles.data}>
                                <Text style={styles.nameClub}>{match.homeTeamName}</Text>
                            </View>
                            <View> 
                                    <Text style={styles.scoreText}>{match.scoreHome}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.cardData}>
                            <View>
                                <Text style={styles.nameClub}>{match.visitorTeamName}</Text>
                            </View>
                            
                            <View> 
                                    <Text style={styles.scoreText}>{match.scoreVisitor}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.cardData}>
                        <Text style={styles.referee}>{match.refereeId}</Text>  
                        </View>    
                    </View>
            </View>
        
    );
}

export default MatchesCard

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
    referee: {
        marginTop: 5,
        marginBottom: 5,
        fontWeight: '500',
        fontSize: 20,
        color: 'grey',
        marginLeft: 5,
        marginRight: 8,
    },
    
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    alignItems: 'center',
    elevation: 10,
    width: '100%',
  },
  modalOption: {
    fontSize: 18,
    marginBottom: 5,
  },
});