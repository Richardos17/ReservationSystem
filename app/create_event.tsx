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
import DropDownPicker from "react-native-dropdown-picker";
import { db } from "../api/firebaseClient"; // Assuming firebase is set up
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';

const App = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [date, setDate] = useState<Date>(new Date(2024, 11, 20));
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState<number>();
  const [sport, setSport] = useState<String>();
  const [timeLength, setTimeLength] = useState(60);
  const [minPeople, setMinPeople] = useState(2);
  const [maxPeople, setMaxPeople] = useState(2);

  const [title, setTitle] = useState<string>();
  const router = useRouter();
  // Fetch events from Firebase
  const fetchEvents = async () => {
    try {
      const eventsCollection = await collection(db, "reservations");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventData = eventsSnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id, // unique ID from Firestore
          title: data.title,
          start: data.start.toDate(), // Convert Firebase Timestamp to JS Date object
          end: data.end.toDate(), // Convert Firebase Timestamp to JS Date object
          description: data.description,
          location: data.location,
        };
      });

      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
 
  const [items, setItems] = useState([
    { label: "30 minút", value: "30" },
    { label: "60 minút", value: "60" },
    { label: "90 minút", value: "90" },
  ]);
  const [itemsPeople, setItemsPeople] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      label: (i + 2).toString(),
      value: i + 2,
    }))
  );
  const incMax = () => {
    setMaxPeople(maxPeople + 1);
  };
  const incMin = () => {
    setMinPeople(minPeople + 1);
  };
  const decMax = () => {
    setMaxPeople(maxPeople - 1);
  };
  const decMin = () => {
    setMinPeople(minPeople - 1);
  };

  const handleConfirm = async () => {
    if (!date || !timeLength || !title) return;
    let endDateTime = date;
    endDateTime.setMinutes(endDateTime.getMinutes() + timeLength);

    router.push({ pathname: "/bookingSum",   params: { date: date.toISOString(), endDateTime: endDateTime.toISOString(), minPeople: minPeople, maxPeople: maxPeople, title:title },
  });

  };
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("sk-SK", {
      weekday: "long", // Full name of the weekday
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
        <Text style={styles.mainTitle}>ZS Lachova</Text>
        <Image style={styles.image} source={require('../assets/images/DA5A8587.jpg')} style={styles.image} />
        
        <Text style={styles.headingText}>Max pocet ucastnikov</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={decMax} style={styles.smallButton}>
            <Text numberOfLines={1} style={styles.smallButtonText}>
              -
            </Text>
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.number}>
            {maxPeople}
          </Text>
          <TouchableOpacity onPress={incMax} style={styles.smallButton}>
            <Text numberOfLines={1} style={styles.smallButtonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headingText}>Min pocet ucastnikov</Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={decMin} style={styles.smallButton}>
            <Text numberOfLines={1} style={styles.smallButtonText}>
              -
            </Text>
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles.number}>
            {minPeople}
          </Text>
          <TouchableOpacity onPress={incMin} style={styles.smallButton}>
            <Text numberOfLines={1} style={styles.smallButtonText}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View>
        <DropDownPicker
          open={open}
          value={timeLength}
          items={items}
          setOpen={setOpen}
          setValue={setSport}
          placeholder="Sport"
          style={styles.sportSelect}
          textStyle={styles.sportSelectText}
          
        />
        </View>
        
        <TextInput
          style={styles.inputText}
          placeholder="Nazov eventu"
          value={title}
          onChangeText={(value) => setTitle(value)} // Update state on text change
        />

        <TouchableOpacity style={styles.payButton} onPress={handleConfirm}>
          <Text style={styles.payButtonText}>Platba</Text>
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
  picker: {
    width: 200,
    height: 50,
  },
  mainTitle: {
    margin: 15,
    color: "#1D2529",
    fontWeight: "bold",
    fontSize: 30
  },
  image:{
    width: 200,
    height: 200,
    },
  inputText: {
    backgroundColor: "#76858B",
    color: "#39484E",
    borderWidth: 2, // Add border width
    borderColor: "black",
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center"
  },
  headingText: {
    textAlign: "center",
    color: "#1D2529",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    width: 200,
  },
  sportSelect:{
    backgroundColor: "#39484E",
    color: "white",
    width: "40%",
    marginTop: 10,

  },
  sportSelectText:{
    backgroundColor: "#39484E",
    color: "white"
  },
  smallButton: {
    backgroundColor: "#39484E",
    borderWidth: 2, // Add border width
    borderColor: "black",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  smallButtonText: {
    color: "white",
  },
  payButton: {
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
  payButtonText: {
    color: "white",
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#39484E",
    borderWidth: 2, // Add border width
    borderColor: "black",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row", // Align children horizontally
    alignItems: "center", // Center items vertically
    marginTop: 10, // Optional: Add spacing above the row
    justifyContent: "center", // Center children horizontally in the row
  },
});

export default App;
