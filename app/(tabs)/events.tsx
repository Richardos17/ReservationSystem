import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import {
  Searchbar,
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
      const eventsCollection = await collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventData = eventsSnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id, // unique ID from Firestore
          title: data.title,
          start: data.start, // Convert Firebase Timestamp to JS Date object
          end: data.end, // Convert Firebase Timestamp to JS Date object
          location: data.playground,
          max: data.maxPeople,
          min: data.minPeople,
          price: data.price

        };
      });
      if (JSON.stringify(eventData) !== JSON.stringify(events)) {
      }
      setEvents(eventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  useEffect(() => {
    // Start fetching data every second
    //const interval = setInterval(() => {
    fetchEvents();
    // }, 1000);

    // Cleanup interval on unmount
    // return () => clearInterval(interval);
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
  const filteredData = events.filter((item) => {
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
  console.log(filteredData);
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
        <Button onPress={showDatePicker} title={selectedDate || "Dátum"} />

        {/* Dropdown Menu */}
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} title={selectedTag || "Šport"} />}
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
        <Button onPress={resetFilters} title="Reset" />
      </View>

      {/* Results List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.resultCard}>
            <View>
              <View style={styles.row}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardTitle}>
                  {new Intl.DateTimeFormat("sk-SK", {
                    year: "numeric",
                    month: "long", // Full month name (e.g., "november")
                    day: "numeric", // Day of the month (e.g., "16")
                  }).format(item.start)}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardSubTitle}>{item.location}</Text>
              <Text style={styles.cardSubTitle}>
                {new Intl.DateTimeFormat("sk-SK", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // Ensure 24-hour format
                }).format(item.start)}{" "}
                -{" "}
                {new Intl.DateTimeFormat("sk-SK", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false, // Ensure 24-hour format
                }).format(item.end)}
              </Text>
            </View>

            <Card.Cover
              source={require("../../assets/images/DA5A8587.jpg")}
              style={styles.cardImage}
            />
            <Text style={styles.cardInfo}>Maximálny počet účastníkov: {item.max}</Text>

            <Text style={styles.cardInfo}>Minimálny počet účastníkov: {item.min}</Text>


            <Text style={styles.cardInfo}>Cena: {item.price} kredity</Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Pridať sa</Text>
            </TouchableOpacity>
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

export default SportsSearch;
