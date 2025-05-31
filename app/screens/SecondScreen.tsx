import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/AppNavigator"
import { SafeAreaView } from "react-native-safe-area-context"
import FontAwesome from "react-native-vector-icons/FontAwesome"

export const SecondScreen = observer(function SecondScreen() {
  const { userStore } = useStores() // Access your userStore
  const [timer, setTimer] = useState(0)
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList, "SecondScreen">>()

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
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={20} color="#000" />
        </TouchableOpacity>
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
          onPress={() => navigation.navigate("ThirdScreen")}
        >
          <Text style={styles.goToThirdScreenButtonText}>Go to Third Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  backButton: {
    marginTop: 10,
    marginLeft: 10,
    padding: 8,
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 100,
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
