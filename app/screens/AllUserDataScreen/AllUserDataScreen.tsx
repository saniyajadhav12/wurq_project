import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/AppNavigator"
import { SafeAreaView } from "react-native-safe-area-context"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { styles } from "./AllUserDataScreen.styles"

export const AllUserDataScreen = observer(function AllUserDataScreen() {
  const { userStore } = useStores()
  const [timer, setTimer] = useState(0)
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList, "AllUserDataScreen">>()

  const [promiseResult, setPromiseResult] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

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

        <Text style={styles.header}>Second Screen</Text>
        <Text style={styles.timerText}>Timer: {timer} seconds</Text>
        <Text style={styles.promiseText}>{promiseResult}</Text>

        <Text style={styles.subHeader}>All Users Data:</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.usersTextBox}>{allUsersText}</Text>
        </ScrollView>

        <TouchableOpacity
          style={styles.goToThirdScreenButton}
          onPress={() => navigation.navigate("WurqScreen")}
        >
          <Text style={styles.goToThirdScreenButtonText}>Go to Third Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
})
