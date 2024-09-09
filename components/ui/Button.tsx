import React from 'react'
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  button: {
    display: "flex",
    padding: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 4,
    textAlign: "center",
  },
});

type Props = {
  onPress: () => void
  children: React.ReactNode
}

function Button({ onPress, children }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

export default Button