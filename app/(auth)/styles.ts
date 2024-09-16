import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  screen: {
    padding: 10,
    display: "flex",
    gap: 8,
  },
  input: {
    display: "flex",
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 10
  },
  signUpText: {
    color: "lightBlue",
    backgroundColor: "transparent",
    borderBottomWidth: 1
  }
});