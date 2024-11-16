import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { db } from "../api/firebaseClient"; // Assuming firebase is set up
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
const user = "Alex Zalesak";
const App = () => {
  const [price, setPrice] = useState<number>();
  const { date, endDateTime, minPeople, maxPeople, title } = useLocalSearchParams();
  const router = useRouter();

 

  const handleConfirm = async () => {
    let dateTime = new Date(date)
    let endDateTime = dateTime;
    endDateTime.setMinutes(endDateTime.getMinutes() + 60);
    await addDoc(collection(db, "events"), {
      user: user,
      title: title,
      start: dateTime,
      end: endDateTime,
      playground: "ZŠ Lachova 1",
      minPeople: minPeople,
      maxPeople: maxPeople,
      price: 2
    });

    console.log("Adding");
    router.push("/events");
  };
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("sk-SK", {
      year: "numeric",
      month: "long", // Full name of the month
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title} >ZS Lachova</Text>
        <Text style={styles.info} >{formatDate(new Date(date) )}</Text>
        <Text style={styles.info} >Min pocet ucastnikov</Text>
        <Text style={styles.info} >{minPeople}</Text>
        <Text style={styles.info} >Max pocet ucastnikov</Text>
        <Text style={styles.info} >{maxPeople}</Text>


        {price && <Text>Cena {price} kreditov</Text>}
      {date && (
        <Text style={styles.info}>Minimálna kapacita sa musí naplniť do {formatDate(new Date(date) )}</Text>
      )}
              <Text style={styles.price}>6.00€</Text>

        <Text style={styles.price}>Vyberte spôsob platby</Text>

        

        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
          <Text style={styles.payText}>Kredit</Text>
          <Text style={styles.payText}>Aktuálny zostatok 10.00€</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
          <Text style={styles.payText}>Platobná karta</Text>
        </TouchableOpacity>


      
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E2DCD0",
    justifyContent: "center",
    alignItems: "center",
  },

  innerContainer: {
    backgroundColor: "#A3ACA9",
    width: "90%",
    marginTop: 5,
    borderWidth: 2, // Add border width
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center", // Centers horizontally
    padding: 10,
  },
  title:{
    fontWeight: "500",
    fontSize: 30
  },
  payText:{
    fontWeight: "500",
    fontSize: 20
  },
  info:{
    fontWeight: "500",
    fontSize: 20
  },
  price:{
    fontWeight: "500",
    fontSize: 30
  },
  button:{
    backgroundColor: "#76858B",
    borderWidth: 2, // Add border width
    borderColor: "black",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    width: "70%"
  }
});

export default App;
