import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    display: "flex",
    gap: 8,
  },
})

function ThemedScreen(props: ViewProps) {
  return (
    <View style={styles.screen} {...props}>
      { props.children }
    </View>
  )
}

export default ThemedScreen