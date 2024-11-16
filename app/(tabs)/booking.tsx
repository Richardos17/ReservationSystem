import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Button } from "react-native";
import { Calendar,  } from "react-native-big-calendar";
import moment from "moment";
import { db } from "../../api/firebaseClient"; // Assuming firebase is set up
import { getFirestore, collection, getDocs } from "firebase/firestore"; 

// Initialize the localizer for the calendar using moment.js

const EventCalendar = () => {
  const [events, setEvents] = useState<any[]>([]);
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
    // Fetch events from Firebase
    

    fetchEvents();
  }, []);

  const handleSelectEvent = (event: any) => {
    alert(`Event selected: ${event.title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Event Calendar</Text>

      <Calendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        views={['month', 'week', 'day']} // Enable month, week, and day views
        defaultView="week" // Default view to 'week'
        
        // Set time range from 8 AM to 11 PM
        min={new Date(2024, 10, 15, 8, 0)}  // Set the minimum time to 8:00 AM
        max={new Date(2024, 10, 15, 23, 0)} // Set the maximum time to 11:00 PM

        

        // Optionally, disable dragging and resizing if not needed
        draggableAccessor={() => false} // Disable drag and drop functionality
      />

      <Button title="Add Event" onPress={() => alert("Event Added")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  calendar: {
    height: 400,
  },
});

export default EventCalendar;
