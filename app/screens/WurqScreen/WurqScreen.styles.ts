import { StyleSheet, Dimensions } from "react-native"

const screenWidth = Dimensions.get("window").width

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313E49",
  },
  header: {
    backgroundColor: "#313E49",
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 8,
  },
  backButton: {
    marginTop: 8,
    marginLeft: 8,
    padding: 8,
    position: "absolute",
    top: 6,
    left: 10,
    zIndex: 100,
  },
  logo: {
    width: 160,
    height: 50,
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
    marginBottom: 8,
  },
  chartSection: {
    backgroundColor: "#313E49",
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 16,
    padding: 16,
  },
  historyCard: {
    flexDirection: "row",
    backgroundColor: "#20262A",
    borderRadius: 12,
    padding: 0,
    marginBottom: 8,
    overflow: "hidden",
  },
  historyLeft: {
    flex: 1,
    padding: 16,
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
    marginBottom: 8,
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
    padding: 8,
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
    padding: 16,
    marginBottom: 16,
    alignSelf: "center",
    width: "80%",
  },
  inputLabel: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    backgroundColor: "#20262A",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
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
