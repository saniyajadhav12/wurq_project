// AllUserDataScreen.styles.ts
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
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
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  timerText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
    color: "#555",
  },
  promiseText: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
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
    marginBottom: 16,
  },
  goToThirdScreenButton: {
    backgroundColor: "#28a745",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  goToThirdScreenButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
