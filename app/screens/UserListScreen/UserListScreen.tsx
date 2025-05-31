import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/AppNavigator"
import { styles } from "./UserListScreen.styles"

export const UserListScreen = observer(function UserListScreen() {
  const { userStore } = useStores()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList, "UserList">>()

  useEffect(() => {
    userStore.fetchUsers()
  }, [userStore])

  const renderUserCard = ({ item }: { item: any }) => {
    const age = item.user.age
    let cardColor = "transparent"

    // Conditional styling based on age
    if (age < 30) {
      cardColor = "gray"
    } else if (age >= 30 && age <= 50) {
      cardColor = "red"
    } else if (age > 50) {
      cardColor = "blue"
    }

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
      <View style={{ flex: 1 }}>
        <Text style={styles.totalFeesText}>Total Fees Paid by All Users: ${totalFees}</Text>
        <FlatList
          data={userStore.users}
          renderItem={renderUserCard}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
        />
        <TouchableOpacity
          style={styles.goToSecondScreenButton}
          onPress={() => navigation.navigate("AllUserDataScreen")}
        >
          <Text style={styles.goToSecondScreenButtonText}>Go to Second Screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
})
