import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native"
import { observer } from "mobx-react-lite"
import { LineChart } from "react-native-chart-kit"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AppStackParamList } from "@/navigators/AppNavigator"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const screenWidth = Dimensions.get("window").width

export const ThirdScreen = observer(function ThirdScreen() {
  const [points, setPoints] = useState("189")
  const [wodName, setWodName] = useState("WOD Newton")
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList, 'ThirdScreen'>>()

  // State to hold history entries, updated dynamically
  const [historyEntries, setHistoryEntries] = useState([
    {
      date: "7/30/2022",
      wodName: "WOD Newton",
      time: "12:53",
      restTime: "0:37",
      restPercent: "5%",
      score: 167,
      plusPoints: 189,
    },
    {
      date: "8/1/2022",
      wodName: "WOD Alpha",
      time: "10:00",
      restTime: "0:30",
      restPercent: "5%",
      score: 150,
      plusPoints: 170,
    },
    {
      date: "8/5/2022",
      wodName: "WOD Beta",
      time: "11:15",
      restTime: "0:40",
      restPercent: "5%",
      score: 180,
      plusPoints: 200,
    },
    {
      date: "8/10/2022",
      wodName: "WOD Gamma",
      time: "09:30",
      restTime: "0:35",
      restPercent: "5%",
      score: 190,
      plusPoints: 210,
    },
  ])

  // Derive chart data from historyEntries
  const chartData = {
    labels: historyEntries.map((entry) => entry.date),
    datasets: [
      {
        data: historyEntries.map((entry) => entry.plusPoints),
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`, // green line
        strokeWidth: 2,
        withDots: false, // we'll handle dots manually if needed
      },
    ],
  }

  // Chart configuration
  const chartConfig = {
    backgroundColor: "#202B33",
    backgroundGradientFrom: "#202B33",
    backgroundGradientTo: "#202B33",
    decimalPlaces: 0, // Optional: number of decimal places for the y-axis labels
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Color of labels and lines
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
    // Optional: for cubic bezier line
    bezier: true,
    // Add props for the Y-axis if needed
    propsForVerticalLabels: {
      fontSize: 10,
    },
    // Add props for the X-axis if needed
    propsForHorizontalLabels: {
      fontSize: 10,
    },
  }

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
      restTime: "0:00",
      restPercent: "0%",
      score: parsedPoints,
      plusPoints: parsedPoints,
    }

    setHistoryEntries([...historyEntries, newEntry])
    setPoints("")
    setWodName("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Header/Logo */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/WURQ_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.separator} />
        </View>

        {/* Points per WOD Chart Section */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Points per WOD</Text>
          {historyEntries.length > 0 ? (
            <LineChart
              data={chartData}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          ) : (
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartPlaceholderText}>No data for chart yet.</Text>
            </View>
          )}
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>History:</Text>
          {historyEntries.map((entry, index) => (
            <View key={index} style={styles.historyCard}>
  <View style={styles.historyLeft}>
    <View style={styles.historyRowTop}>
      <Text style={styles.historyDate}>{entry.date}</Text>
      <FontAwesome name="heart-o" size={16} color="#FF4F4F" />
    </View>

    <Text style={styles.historyWodName}>{entry.wodName}</Text>

    <View style={styles.detailsRow}>
      <Text style={styles.detailLabel}>Time: </Text>
      <Text style={styles.detailValue}>{entry.time}</Text>

      <Text style={styles.detailLabel}>   Rest: </Text>
      <Text style={styles.detailValue}>{entry.restTime}</Text>
      <Text style={styles.percentageText}> | {entry.restPercent}</Text>

      <Text style={styles.scoreValue}>   {entry.score}</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313E49",
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
    backgroundColor: "#313E49",
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 8,
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
    backgroundColor: "#313E49",
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
    backgroundColor: "#313E49",
    borderRadius: 8,
  },
  chartPlaceholderText: {
    color: "#ccc",
    fontSize: 16,
  },
  historySection: {
    marginBottom: 20,
    padding: 16,
  },
  historyCard: {
    flexDirection: "row",
    backgroundColor: "#20262A",
    borderRadius: 12,
    padding: 0,
    marginBottom: 10,
    overflow: "hidden",
  },
  historyLeft: {
    flex: 1,
    padding: 15,
  },
  historyRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  historyDate: {
    color: "#aaa",
    fontSize: 12,
  },
  historyWodName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  historyDetailsRow: {
    flexDirection: "row",
  },
  historyDetail: {
    color: "#fff",
    fontSize: 13,
    marginRight: 8,
  },
  historyRight: {
    backgroundColor: "#000",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  historyPlusPoints: {
    color: "#00FF00",
    fontSize: 22,
    fontWeight: "bold",
  },
  historySmallText: {
    color: "#aaa",
    fontSize: 10,
  },
  inputFormSection: {
    backgroundColor: "#313E49",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    alignSelf: "center",
    width: "80%",
  },
  inputLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#20262A",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 160,
    height: 50,
  },
  separator: {
    height: 4,
    width: "100%",
    backgroundColor: "#000",
    marginTop: 4,
  },
  detailsRow: {
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: 4,
},

detailLabel: {
  color: "#aaa",
  fontSize: 13,
},

detailValue: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "600",
},

percentageText: {
  color: "#FF4F4F",
  fontSize: 13,
  fontWeight: "600",
  marginLeft: 4,
},

scoreValue: {
  color: "#fff",
  fontSize: 13,
  fontWeight: "600",
  marginLeft: 8,
},

})
