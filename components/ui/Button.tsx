import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

// const styles = StyleSheet.create({
//   button: {
//     display: "flex",
//     padding: 8,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#999999",
//     borderRadius: 4,
//     textAlign: "center",
//     justifyContent: "center"
//   },
// });

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    padding: 8,
    // borderColor: "rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgb(47, 48, 55)",
    borderColor: "rgb(47, 48, 55)",
    borderWidth: 1,
    fontSize: 14,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0, 0, 0, 0.07)",
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowRadius: 5
  },
  text: {
    color: "white",
    fontWeight: "bold",
    display: "flex",
    gap: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  }
});

type Props = {
  onPress: () => void
  children: React.ReactNode | string,
  style?: StyleProp<ViewStyle>
}

function Button({ onPress, children }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        { children }
      </Text>
    </TouchableOpacity>
  )
}

export default Button