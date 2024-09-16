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
  buttonBak: {
    display: "flex",
    padding: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 4,
    textAlign: "center",
    justifyContent: "center"
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#eeeeee",
    padding: 12,
    borderColor: "#ddd",
    borderWidth: 1,
    color: "#111",
    fontSize: 14,
    fontWeight: "bold"
  },
});

type Props = {
  onPress: () => void
  children: React.ReactNode | string,
  style?: StyleProp<ViewStyle>
}

function Button({ onPress, children }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default Button