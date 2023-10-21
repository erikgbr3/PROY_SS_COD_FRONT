import { StatusBar } from "expo-status-bar";
import { LeaguesProvider, useLeaguesState } from "../providers/leaguesProvider"
import LeaguesCard from "./components/leaguesCard";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FC, useEffect } from "react";

type Props = {
  navigation: any,
}

const LeaguesScreenView:FC<Props> = ({navigation}) => {
  const {
    leagues,
    getLeagues,
  } = useLeaguesState();

  const renderCards = () => {
    if (leagues == null) {
      return null;
    }
    return leagues?.map((league) => <LeaguesCard key={league.id} league={league} />)
  }

  useEffect(() => {
    getLeagues();
  }, [])

  const viewMatches = () => {
    navigation.navigate('Leagues');
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Encuentra tu liga Favorita</Text>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={viewMatches}>
           {renderCards()}
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const LeaguesScreen = (props: any) => (
  <LeaguesProvider>
    <LeaguesScreenView {...props} />
  </LeaguesProvider>
)

export default LeaguesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    paddingLeft: 2,
    color: '#0d47a1'
  },
  header:{
    paddingTop: 20,
    paddingHorizontal: 15,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  }
});