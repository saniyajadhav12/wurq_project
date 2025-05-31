import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native"
import { useStores } from "../models"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

export const UserListScreen = observer(function UserListScreen() {
  const { userStore } = useStores()
  const navigation = useNavigation()

  useEffect(() => {
    userStore.fetchUsers()
  }, [userStore])

  const renderUserCard = ({ item }: { item: any }) => {
    const age = item.user.age
    let cardColor = "transparent"

    // Conditional styling based on age 
    if (age < 30) {
      // Users younger than 30 years 
      cardColor = "gray"
    } else if (age >= 30 && age <= 50) {
      // Users 30 - 50 
      cardColor = "red"
    } else if (age > 50) {
      // Older than 50 
      cardColor = "blue"
    }
    // Users with negative age are already filtered in the store

    return (
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={styles.cardText}>
          Name: {item.user.name} {item.user.lastname}
        </Text>
        <Text style={styles.cardText}>Age: {item.user.age}</Text>
        <Text style={styles.cardText}>Fee: ${item.user.fee}</Text>
        <Text style={styles.cardText}>Location: {item.location}</Text>
        <Text style={styles.cardText}>Date: {item.date}</Text>
      </View>
    )
  }

  // Calculate total fees
  const totalFees = userStore.users.reduce((sum, user) => sum + user.user.fee, 0)

  if (userStore.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading users...</Text>
      </View>
    )
  }

  if (userStore.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {userStore.error}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.totalFeesText}>Total Fees Paid by All Users: ${totalFees}</Text>
      <FlatList
        data={userStore.users}
        renderItem={renderUserCard}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
      />

      {/* Button to navigate to Second Screen */}
      <TouchableOpacity
        style={styles.goToSecondScreenButton}
        onPress={() => navigation.navigate("SecondScreen")} 
      >
        <Text style={styles.goToSecondScreenButtonText}>Go to Second Screen</Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  card: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    color: "#fff",
    marginBottom: 4,
  },
  listContent: {
    paddingBottom: 20,
  },
  totalFeesText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  goToSecondScreenButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  goToSecondScreenButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
