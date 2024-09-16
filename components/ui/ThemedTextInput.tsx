import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#555"
  },
});


function ThemedTextInput(props: TextInputProps) {
  return <TextInput style={styles.input} {...props} />
}

export default ThemedTextInput
