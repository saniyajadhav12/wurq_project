import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native"
import { observer } from "mobx-react-lite"
import { SafeAreaView } from "react-native-safe-area-context"

const screenWidth = Dimensions.get("window").width

export const ThirdScreen = observer(function ThirdScreen() {
  const [points, setPoints] = useState("189")
  const [wodName, setWodName] = useState("WOD Newton")

  // State to hold history entries, updated dynamically
  const [historyEntries, setHistoryEntries] = useState([
    {
      date: "7/30/2022",
      wodName: "WOD Newton",
      time: "12:53",
      percentage: "0:3715%",
      score: 167,
      plusPoints: 189,
    },
    {
      date: "8/1/2022",
      wodName: "WOD Alpha",
      time: "10:00",
      percentage: "0:3000%",
      score: 150,
      plusPoints: 170,
    },
    {
      date: "8/5/2022",
      wodName: "WOD Beta",
      time: "11:15",
      percentage: "0:4000%",
      score: 180,
      plusPoints: 200,
    },
    {
      date: "8/10/2022",
      wodName: "WOD Gamma",
      time: "09:30",
      percentage: "0:3500%",
      score: 190,
      plusPoints: 210,
    },
  ])

  const handleSubmit = () => {
    const parsedPoints = parseFloat(points)
    if (isNaN(parsedPoints)) {
      alert("Please enter a valid number for Points.")
      return
    }

    const newEntry = {
      date: new Date().toLocaleDateString(),
      wodName: wodName,
      time: "N/A",
      percentage: "N/A",
      score: parsedPoints,
      plusPoints: parsedPoints,
    }

    setHistoryEntries([...historyEntries, newEntry])
    setPoints("")
    setWodName("")
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={{flex: 1}}>
      {/* Header/Logo */}
      <View style={styles.header}>
        <Text style={styles.headerText}>WURQ</Text>
      </View>

      {/* History Section */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>History:</Text>
        {historyEntries.map((entry, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.historyLeft}>
              <Text style={styles.historyDate}>{entry.date}</Text>
              <Text style={styles.historyWodName}>{entry.wodName}</Text>
              <View style={styles.historyDetailsRow}>
                <Text style={styles.historyDetail}>{entry.time}</Text>
                <Text style={styles.historyDetail}>{entry.percentage}</Text>
                <Text style={styles.historyDetail}>Score: {entry.score}</Text>
              </View>
            </View>
            <View style={styles.historyRight}>
              <Text style={styles.historyPlusPoints}>+{entry.plusPoints}</Text>
              <Text style={styles.historySmallText}>Total Points</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Input Form Section */}
      <View style={styles.inputFormSection}>
        <Text style={styles.inputLabel}>Points</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={points}
          onChangeText={setPoints}
          placeholder="Enter points"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          value={wodName}
          onChangeText={setWodName}
          placeholder="Enter WOD Name"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e3f",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  chartSection: {
    backgroundColor: "#3a3a4f",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f4f6a",
    borderRadius: 8,
  },
  chartPlaceholderText: {
    color: "#ccc",
    fontSize: 16,
  },
  historySection: {
    marginBottom: 20,
  },
  historyCard: {
    flexDirection: "row",
    backgroundColor: "#3a3a4f",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyLeft: {
    flex: 1,
  },
  historyDate: {
    color: "#aaa",
    fontSize: 12,
    marginBottom: 4,
  },
  historyWodName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  historyDetailsRow: {
    flexDirection: "row",
  },
  historyDetail: {
    color: "#fff",
    fontSize: 14,
    marginRight: 10,
  },
  historyRight: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
  historyPlusPoints: {
    color: "#32CD32",
    fontSize: 24,
    fontWeight: "bold",
  },
  historySmallText: {
    color: "#aaa",
    fontSize: 10,
  },
  inputFormSection: {
    backgroundColor: "#3a3a4f",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  inputLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#4f4f6a",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})
