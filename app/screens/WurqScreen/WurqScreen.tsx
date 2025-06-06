import React, { useState } from "react"
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
import { Svg, Circle, Line } from "react-native-svg"

const screenWidth = Dimensions.get("window").width
const chartHeight = 220
const dataPoints = [15, -2, -6, 6, 9, 5, -3, 10]

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

  const chartConfig = {
    backgroundColor: "#202B33",
    backgroundGradientFrom: "#202B33",
    backgroundGradientTo: "#202B33",
    decimalPlaces: 0,
    color: () => "#7D7D7D",
    labelColor: () => "#ffffff",
    propsForBackgroundLines: {
      stroke: "#444",
    },
    strokeWidth: 2,
    barPercentage: 1,
    useShadowColorFromDataset: false,
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
              data={{
                labels: ["", "", "", "", "", "", "", ""],
                datasets: [
                  {
                    data: dataPoints,
                    strokeWidth: 2,
                  },
                ],
              }}
              width={screenWidth - 32}
              height={220}
              withDots={false}
              withInnerLines={true}
              withOuterLines={false}
              withShadow={false}
              withVerticalLabels={false}
              withHorizontalLabels={true}
              chartConfig={chartConfig}
              bezier={false}
              decorator={() => {
                const min = Math.min(...dataPoints)
                const max = Math.max(...dataPoints)
                
                const leftPadding = 64
                const rightPadding = 40
                const topPadding = 16
                const bottomPadding = 42
                
                const chartWidth = screenWidth - 32
                const usableWidth = chartWidth - leftPadding - rightPadding
                const usableHeight = chartHeight - topPadding - bottomPadding
                
                // Calculate spacing between points
                const spacing = usableWidth / (dataPoints.length - 1)

                const valueToY = (value: number) => {
                  const scale = (value - min) / (max - min || 1)
                  return topPadding + (1 - scale) * usableHeight
                }

                return (
                  <Svg>
                    {/* Dots */}
                    {dataPoints.map((value, index) => {
                      const cx = leftPadding + (spacing * index)
                      const cy = valueToY(value)
                      return (
                        <Circle
                          key={`dot-${index}`}
                          cx={cx}
                          cy={cy}
                          r="6"
                          stroke="#313E49"
                          strokeWidth="2"
                          fill={value >= 0 ? "#00FFB4" : "#FFFFFF"}
                        />
                      )
                    })}
                    {/* Zero Line */}
                    <Line
                      x1={leftPadding}
                      x2={chartWidth - rightPadding}
                      y1={valueToY(0)}
                      y2={valueToY(0)}
                      stroke="#FFFFFF"
                      strokeDasharray="6,4"
                      strokeWidth={2}
                    />
                  </Svg>
                )
              }}
              style={{
                borderRadius: 16,
              }}
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