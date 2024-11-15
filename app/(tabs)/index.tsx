import React from 'react';
import { View, StyleSheet, ImageBackground, } from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';
import { Link } from 'expo-router';

const App = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Športoviská Petržalka" />
      </Appbar.Header>

      {/* Background Image */}
      
        {/* Search Inputs */}
        <View style={styles.searchContainer}>
          <TextInput
            mode="outlined"
            label="Miesto"
            style={styles.input}
            left={<TextInput.Icon name="map-marker" />}
          />
          <TextInput
            mode="outlined"
            label="Dátum"
            style={styles.input}
            left={<TextInput.Icon name="calendar" />}
          />
          <Button 
            mode="contained" 
            style={styles.button} 
            onPress={() => console.log('Pressed')}
          >
            Prihlásenie
          </Button>
          <Link href="/create_event">Vytvoriť event</Link>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E0E0E0', // Adjust the color if needed
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: '100%',
  },
});

export default App;
