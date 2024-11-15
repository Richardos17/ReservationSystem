import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

const App = () => {
  const [lightOn, setLightOn] = useState(false);
  const [reservationName, setReservationName] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [tillDate, setTillDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showTillPicker, setShowTillPicker] = useState(false);

  const toggleLight = async () => {
    const newState = !lightOn; // Determine the new light state
    const webhookUrl = "https://webhook.site/267fd95d-6db4-4256-8ea8-94de52bacf04"; // Replace with your Webhook.site URL
    const payload = {
      command: newState ? "turn_on" : "turn_off",
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(webhookUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLightOn(newState); // Update UI state only on success
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Moja rezervácia</Text>
      <Text style={styles.timeText}>
          Od: {fromDate.toLocaleString()}
        </Text>
      

        <Text style={styles.timeText}>
          Do: {tillDate.toLocaleString()}
        </Text>
      {/* Light Toggle */}
      <TouchableOpacity style={styles.button} onPress={toggleLight}>
        <Text style={styles.buttonText}>{lightOn ? "Turn Light Off" : "Turn Light On"}</Text>
      </TouchableOpacity>

      

        

      {/* QR Code */}
      <View style={styles.qrCodeContainer}>
        <Text>QR Code:</Text>
        <QRCode value={`Reservation: ${reservationName}`} size={150} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  timeText: {
    color: "black",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  qrCodeContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default App;
