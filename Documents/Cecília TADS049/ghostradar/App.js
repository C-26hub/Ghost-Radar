import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from "axios"

export default function App() {

  const [monster, setMonster] = useState(null);

  const [loading, setLoading] = useState(false);

  async function getRandomMonster() {

    try {

      setLoading(true);

      // pega lista de monstros
      const listResponse = await axios.get(
        "https://www.dnd5eapi.co/api/monsters"
      );

      const monsters =
        listResponse.data.results;

      // escolhe monstro aleatório
      const randomMonster =
        monsters[
          Math.floor(
            Math.random() * monsters.length
          )
        ];

      // pega detalhes do monstro
      const detailResponse = await axios.get(
        `https://www.dnd5eapi.co${randomMonster.url}`
      );

      setMonster(detailResponse.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {
    getRandomMonster();
  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        GHOST RADAR
      </Text>

      <Text style={styles.ghost}>
        👻
      </Text>

      {loading ? (

        <ActivityIndicator
          size="large"
          color="#00ff99"
        />

      ) : monster ? (

        <>

          <Text style={styles.name}>
            {monster.name}
          </Text>

          <Text style={styles.info}>
            Type: {monster.type}
          </Text>

          <Text style={styles.info}>
            Threat Level: {monster.challenge_rating}
          </Text>

          <Text style={styles.detected}>
            Paranormal activity detected
          </Text>

        </>

      ) : (

        <Text style={styles.error}>
          Failed to detect entity
        </Text>

      )}

      <TouchableOpacity
        style={styles.button}
        onPress={getRandomMonster}
      >
        <Text style={styles.buttonText}>
          DETECT NEW ENTITY
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "#00ff99",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    letterSpacing: 2,
  },

  ghost: {
    fontSize: 80,
    marginBottom: 20,
  },

  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  info: {
    color: "#ccc",
    fontSize: 18,
    marginBottom: 10,
  },

  detected: {
    color: "#00ff99",
    fontSize: 18,
    marginTop: 20,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#00ff99",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "red",
    marginBottom: 20,
  },
});
