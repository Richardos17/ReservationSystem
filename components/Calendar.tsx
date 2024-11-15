import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  CalendarUtils,
} from "react-native-calendars";

// Define the event interface
interface Event {
  id: string;
  start: string; // Format: 'YYYY-MM-DD HH:mm'
  end: string;   // Format: 'YYYY-MM-DD HH:mm'
  title: string;
  description?: string;
}

const EventItem = React.memo(({ event }: { event: Event }) => {
  return (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text>{event.start} - {event.end}</Text>
      {event.description && <Text>{event.description}</Text>}
    </View>
  );
});
// Calendar component props
interface EventCalendarProps {
  events: Event[];
}
const isSameDate = (date1: string, date2: string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
const groupEventsByDate = (events: Event[]): { [date: string]: Event[] } => {
  return events.reduce((acc, event) => {
    const date = event.start.split(" ")[0]; // Extract the 'YYYY-MM-DD' part
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(event);
    return acc;
  }, {} as { [date: string]: Event[] });
};
const renderEventItem = ({ item }: { item: Event }) => <EventItem event={item} />;

export default function EventCalendar() {
  const events: Event[] = [
    {
      id: "1",
      start: "2024-01-01 10:00",
      end: "2024-01-01 12:00",
      title: "Morning Meeting",
      description: "Discuss project updates",
    },
    {
      id: "2",
      start: "2024-01-01 14:00",
      end: "2024-01-01 15:30",
      title: "Lunch with Client",
    },
    {
      id: "3",
      start: "2024-01-02 09:00",
      end: "2024-01-02 10:00",
      title: "Team Standup",
    },
    {
      id: "4",
      start: "2024-01-03 16:00",
      end: "2024-01-03 18:00",
      title: "Workshop",
    },
  ];
  const [selectedDate, setSelectedDate] = useState<string>("2024-01-01");
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<Event[]>([]);

  
  const groupedEvents = groupEventsByDate(events);

  return (
    <CalendarProvider
      date={selectedDate}
      onDateChanged={(date) => setSelectedDate(date)}
      showTodayButton
    >
      <ExpandableCalendar
        firstDay={0}
        minDate={"2024-01-01"}
        maxDate={"2024-01-05"}
      />

<TimelineList
        events={groupedEvents}
        timelineProps={{
          scrollToNow: true,
          showNowIndicator: true,
          renderItem: renderEventItem,
          keyExtractor: (item: { id: any; }) => item.id,
        }}
        key={1}

      />
    </CalendarProvider>
  );
};

// Sample events array



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
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

