import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import { Link } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import { db } from "../api/firebaseClient"; // Assuming firebase is set up
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"; 
import EventCalendar from '@/components/Calendar';
const user = "Alex Zalesak"
const App = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [date, selectDate] = useState<Date>();
  const [price, setPrice] = useState<number>();
  const [title, setTitle] = useState<string>();

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
          start: data.start.toDate(),  // Convert Firebase Timestamp to JS Date object
          end: data.end.toDate(),      // Convert Firebase Timestamp to JS Date object
          description: data.description,
          location: data.location,
        };
      });

      setEvents(eventData);
      console.log(eventData)
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    
    fetchEvents();
  }, []);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [timeLength, setTimeLength] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(2);

  const [items, setItems] = useState([
    { label: '30 minút', value: '30' },
    { label: '60 minút', value: '60' },
    { label: '90 minút', value: '90' },
  ]);
  const [itemsPeople, setItemsPeople] = useState(
    Array.from({ length: 9 }, (_, i) => ({
      label: (i + 2).toString(),
      value: i + 2,
    }))
  );
  
  const handleConfirm = async () => {
    if (!date || !timeLength || !title)
      return
    let endDateTime = date
    endDateTime.setMinutes(endDateTime.getMinutes() + timeLength);

    await addDoc(collection(db, "events"), {
      user: user,
      title: title,
      start: date.toISOString().slice(0, 16),
      end: endDateTime.toISOString().slice(0, 16),
      playground: "ZŠ Lachova 1",
      capacity: selectedNumber
    });
    fetchEvents();
  };
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("sk-SK", {
      weekday: "long", // Full name of the weekday
      year: "numeric",
      month: "long", // Full name of the month
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };
  return (
    <View style={styles.container}>
   
        <Text>Vytvorenie eventu</Text>
        <Text>Dĺžka eventu:</Text>

        <DropDownPicker
        open={open}
        value={timeLength}
        items={items}
        setOpen={setOpen}
        setValue={setTimeLength}
        setItems={setItems}
        placeholder="Select an item"
      />
      <Text>Minimálny počet ľudí:</Text>

      <DropDownPicker
        open={open2}
        value={selectedNumber}
        items={itemsPeople}
        setOpen={setOpen2}
        setValue={setSelectedNumber}
        setItems={setItemsPeople}
        placeholder="Select a number"
        style={styles.picker}
      />
      {price && (
              <Text>Cena {price} kreditov</Text>

      )}
      {date && (
        <Text>
          Minimálna kapacita sa musí naplniť do {formatDate(date)}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    width: 200,
    height: 50,
  },
  buttonContainer: {
    marginTop: 20,
    width: 200,
  },
});

export default App;
