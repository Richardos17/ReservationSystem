import React from 'react';
import { View, StyleSheet, Pressable, TextInput, Text } from 'react-native';
import { Link } from 'expo-router';
import EventCalendar from '@/components/Calendar';
const App = () => {
  return (
    <View style={styles.container}>
   
        <Text>Create</Text>
        <EventCalendar></EventCalendar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
