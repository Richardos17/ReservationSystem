import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-paper';
import { Link , useRouter} from 'expo-router';

const App = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
     
          <Card style={styles.resultCard}>
            <View>
              <View style={styles.row}>
                <Text style={styles.cardTitle}>Uvolnilo sa
                </Text>
                <Text style={styles.cardTitle}>
                  20. novembra
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardSubTitle}>ZŠ Lachova 1</Text>
              <Text style={styles.cardSubTitle}>
                11:00
                -
                12:00
              </Text>
            </View>
            <Card.Cover
              source={require("../../assets/images/DA5A8587.jpg")}
              style={styles.cardImage}
            />
            <TouchableOpacity style={styles.cardButton} onPress={()=>{router.push("../create_event")}}>
              <Text style={styles.cardButtonText} >Vytvoriť event</Text>
            </TouchableOpacity>
          </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  searchBar: {
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
  },
  dateSportContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardButton: {
    backgroundColor: "#39484E",
    borderWidth: 2, // Add border width
    borderColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15
  },
  cardButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  resultCard: {
    marginTop: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#A3ACA9",
    padding: 15,
  },
  cardImage: {
    borderRadius: 10,
    marginBottom: 10, // Optional: Add spacing above the row
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: "500",

  },
  cardSubTitle: {
    fontSize: 15,
    fontWeight: "500",  },
  cardInfo: {
    fontWeight: "500",
    fontSize: 20
  },
  row: {
    flexDirection: "row", // Align children horizontally
    alignItems: "center", // Center items vertically
    marginBottom: 10, // Optional: Add spacing above the row
    justifyContent: "space-between",
  },
  tagsContainer: {
    flexDirection: "row",
    padding: 10,
  },
  chip: {
    marginRight: 5,
    backgroundColor: "#f0f0f0",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default App;
