import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "rgba(0, 0, 0, 0.11)"
  },
});


function ThemedTextInput(props: TextInputProps) {
  return <TextInput style={styles.input} {...props} />
}

export default ThemedTextInput
