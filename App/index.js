// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

const App = () => {
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLetter = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
          { role: "user", content: "Give me a random letter for kids to learn" }
        ],
        model: "gpt-4o"
      });
      const { data } = response;
      const resultString = data.response.trim();
      setLetter(resultString);
    } catch (error) {
      console.error('Error fetching letter:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLetter();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.box}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Text style={styles.letter}>{letter}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={fetchLetter}>
          <Text style={styles.buttonText}>Next Letter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  box: {
    backgroundColor: '#fff',
    padding: 50,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  letter: {
    fontSize: 100,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 15,
    borderRadius: 10,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default App;