import React from 'react'
import { StyleSheet, View } from "react-native";
import { ThemedText } from './ThemedText';

type Props = {
  reps: number
  targetReps: number
}

function ProgressBar({ reps, targetReps }: Props) {
  const w = reps / targetReps > 1 ? 100 : (reps / targetReps) * 100
  return (
    <View style={styles.outer}>
      <View style={{
          ...styles.inner,
          width: `${w}%`
        }}>
      </View>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  outer: {
    height: 5,
    backgroundColor: "#dee4eb",
    width: "100%",
    borderRadius: 5,
    position: "relative"
  },
  inner: {
    height: 5,
    backgroundColor: "#3bd16f",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 5
  }
})