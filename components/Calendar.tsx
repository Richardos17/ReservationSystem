import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";

// Define the event interface
interface Event {
  id: string;
  title: string;
  startDate: string; // ISO string format
  endDate: string;   // ISO string format
}

// Calendar component props
interface EventCalendarProps {
  events: Event[];
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<Event[]>([]);

  // Group events by date
  const groupEventsByDate = () => {
    const eventsByDate: { [key: string]: string[] } = {};
    events.forEach((event) => {
      const eventDate = event.startDate.split("T")[0]; // Extract date part
      if (!eventsByDate[eventDate]) {
        eventsByDate[eventDate] = [];
      }
      eventsByDate[eventDate].push(event.title);
    });
    return eventsByDate;
  };

  // Handle date selection
  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    const filteredEvents = events.filter(
      (event) => event.startDate.split("T")[0] === day.dateString
    );
    setEventsForSelectedDate(filteredEvents);
  };

  const markedDates = groupEventsByDate();

  return (
    <View style={styles.container}>
      <Calendar
        // Marking the dates with events
        markedDates={Object.keys(markedDates).reduce((acc, date) => {
          acc[date] = { marked: true, dotColor: "blue" };
          return acc;
        }, {} as any)}
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: "#00adf5",
          todayTextColor: "#00adf5",
        }}
      />
      <Text style={styles.title}>
        Events for {selectedDate ? selectedDate : "Select a date"}
      </Text>
      <FlatList
        data={eventsForSelectedDate}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text>{item.title}</Text>
            <Text>
              {new Date(item.startDate).toLocaleTimeString()} -{" "}
              {new Date(item.endDate).toLocaleTimeString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text>No events for this date.</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  eventContainer: {
    backgroundColor: "#f0f8ff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default EventCalendar;
