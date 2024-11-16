import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import {
  Searchbar,
  Button,
  Menu,
  Divider,
  Chip,
  Card,
  IconButton,
} from "react-native-paper";
import { db } from "../../api/firebaseClient"; // Assuming firebase is set up
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"; 
import DateTimePicker from "react-native-modal-datetime-picker";

const sportsData = [
  {
    id: "1",
    title: "ZŠ Lachova 1",
    playground: "ZŠ Lachova 1",
    creator: "Alex Zálešák",
    image: "https://via.placeholder.com/300x150",
    tags: ["Futbal", "Basketbal"],
    date: "13.12.2023",
  },
  {
    id: "2",
    title: "ZŠ Lachova 1",
    playground: "ZŠ Lachova 1",
    creator: "Alex Zálešák",
    image: "https://via.placeholder.com/300x150",
    tags: ["Futbal", "Basketbal"],
    date: "13.12.2023",
  },
  {
    id: "3",
    title: "ZŠ Lachova 1",
    playground: "ZŠ Lachova 1",
    creator: "Alex Zálešák",
    image: "https://via.placeholder.com/300x150",
    tags: ["Futbal", "Basketbal"],
    date: "13.12.2023",
  },
  {
    id: "4",
    title: "ZŠ Lachova 1",
    playground: "ZŠ Lachova 1",
    creator: "Alex Zálešák",
    image: "https://via.placeholder.com/300x150",
    tags: ["Futbal", "Basketbal"],
    date: "13.12.2023",
  },
];

const SportsSearch = () => {
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
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
    // Start fetching data every second
    const interval = setInterval(() => {
      fetchEvents();
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  // Date picker handlers
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date.toLocaleDateString());
    hideDatePicker();
  };

  // Dropdown handlers
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  // Filtering data based on search query, selected date, and selected tag
  const filteredData = sportsData.filter((item) => {
    const normalizedTitle = item.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Removing diacritics
    const normalizedSearchQuery = searchQuery
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Removing diacritics

    const matchesSearch = normalizedTitle
      .toLowerCase()
      .includes(normalizedSearchQuery.toLowerCase());
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });
  const resetFilters = () => {
    setSelectedDate("");
    setSelectedTag("");
  };
  return (
    <View style={styles.container}>
      {/* Search Field */}
      <Searchbar
        placeholder="Zadajte názov"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon="map-marker"
        style={styles.searchBar}
      />

      {/* Date and Sport Selector */}
      <View style={styles.dateSportContainer}>
        {/* Date Picker Button */}
        <Button
          mode="contained"
          onPress={showDatePicker}
          icon="calendar"
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          {selectedDate || "Dátum"}
        </Button>

        {/* Dropdown Menu */}
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Button
              mode="contained"
              onPress={openMenu}
              icon="soccer"
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              {selectedTag || "Šport"}
            </Button>
          }
        >
          <Menu.Item
            onPress={() => {
              setSelectedTag("Futbal");
              closeMenu();
            }}
            title="Futbal"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSelectedTag("Basketbal");
              closeMenu();
            }}
            title="Basketbal"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setSelectedTag("Tenis");
              closeMenu();
            }}
            title="Tenis"
          />
        </Menu>
        <Button
          mode="contained"
          onPress={resetFilters}
          icon="refresh"
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Reset
        </Button>
      </View>

      {/* Results List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.resultCard}>
            <Card.Title
              title={item.title}
              left={(props) => <IconButton {...props} icon="school" />}
              right={(props) => (
                <IconButton {...props} icon="dots-horizontal" />
              )}
            />
            <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
            <Text>{item.creator}</Text>
            <Text>{item.date}</Text>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag) => (
                <Chip key={tag} style={styles.chip}>
                  {tag}
                </Chip>
              ))}
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Žiadne výsledky</Text>
        }
      />

      {/* Date Picker */}
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
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
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
  },
  buttonText: {
    color: "#333",
  },
  resultCard: {
    marginTop: 20,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#fff",
  },
  cardImage: {
    borderRadius: 10,
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

export default SportsSearch;
