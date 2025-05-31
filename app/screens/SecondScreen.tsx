import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"

export const SecondScreen = observer(function SecondScreen() {
  const { userStore } = useStores() // Access your userStore
  const [timer, setTimer] = useState(0)
  const navigation = useNavigation()

  const [promiseResult, setPromiseResult] = useState("")

  //Display a timer that starts when the page opens.
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1)
    }, 1000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval)
  }, [])

  //Create a promise that starts an interval of 1 second and returns once the interval is called 3 times.
  useEffect(() => {
    const runPromiseWithInterval = () => {
      return new Promise<string>((resolve) => {
        let count = 0
        const intervalId = setInterval(() => {
          count++
          if (count === 3) {
            clearInterval(intervalId)
            resolve("Promise resolved: Interval called 3 times!")
          }
        }, 1000)
      })
    }

    runPromiseWithInterval().then((message) => {
      setPromiseResult(message)
    })
  }, [])

  //Display all the users as a single text box.
  const allUsersText = userStore.users
    .map((item) => {
      return `ID: ${item.id}, Name: ${item.user.name} ${item.user.lastname}, Age: ${item.user.age}, Fee: $${item.user.fee}, Location: ${item.location}, Date: ${item.date}`
    })
    .join("\n\n")

  return (
    <View style={styles.container}>
      {/* Timer Display */}
      <Text style={styles.header}>Second Screen</Text>
      <Text style={styles.timerText}>Timer: {timer} seconds</Text>

      {/* Promise Result Display */}
      <Text style={styles.promiseText}>{promiseResult}</Text>

      {/* All Users in a Single Text Box */}
      <Text style={styles.subHeader}>All Users Data:</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.usersTextBox}>{allUsersText}</Text>
      </ScrollView>

      
      <TouchableOpacity
        style={styles.goToThirdScreenButton}
        onPress={() => {}} 
      >
        <Text style={styles.goToThirdScreenButtonText}>Go to Third Screen</Text>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  timerText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#555",
  },
  promiseText: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  usersTextBox: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  goToThirdScreenButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  goToThirdScreenButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
