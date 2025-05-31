import React, { useState, useEffect } from "react"
import {
  View,
  Text,
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
import { styles } from "./WurqScreen.styles"

const screenWidth = Dimensions.get("window").width

export const WurqScreen = observer(function WurqScreen() {
  const [points, setPoints] = useState("189")
  const [wodName, setWodName] = useState("WOD Newton")
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList, "WurqScreen">>()

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

  const chartData = {
    labels: historyEntries.map((entry) => entry.date),
    datasets: [
      {
        data: historyEntries.map((entry) => entry.plusPoints),
        color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
        strokeWidth: 2,
        withDots: false,
      },
    ],
  }

  const chartConfig = {
    backgroundColor: "#202B33",
    backgroundGradientFrom: "#202B33",
    backgroundGradientTo: "#202B33",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
    bezier: true,
    propsForVerticalLabels: {
      fontSize: 10,
    },
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesome name="chevron-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Image
            source={require("../../../assets/images/WURQ_logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.separator} />
        </View>

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
                  <Text style={styles.detailLabel}> Rest: </Text>
                  <Text style={styles.detailValue}>{entry.restTime}</Text>
                  <Text style={styles.percentageText}> | {entry.restPercent}</Text>
                  <Text style={styles.scoreValue}> {entry.score}</Text>
                </View>
              </View>
              <View style={styles.historyRight}>
                <Text style={styles.historyPlusPoints}>+{entry.plusPoints}</Text>
                <Text style={styles.historySmallText}>Total Points</Text>
              </View>
            </View>
          ))}
        </View>

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
