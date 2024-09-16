'use client'
// import { RepRecord, Workout, WorkoutTypeEnum } from '@/models'
import { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { Text, Pressable, StyleSheet, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type Props = {
  id: string,
  name: string,
  currentReps: number
  targetReps: number
  onPress: (id: string) => void
}

function LogRepsButton({ id, name, currentReps, targetReps, onPress }: Props) {
  const [progressStr, setProgressStr] = useState('')

  useEffect(() => {
    setProgressStr(`${currentReps}/${targetReps}`)
  }, [currentReps, targetReps])

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => onPress(id)}
    >
      <View style={styles.button}>
        <Text>{name} ({progressStr})</Text>
        <ProgressBar reps={currentReps} targetReps={targetReps} />
      </View>
    </Pressable>
  )
}

export default LogRepsButton

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 5,
    backgroundColor: "#eeeeee",
    padding: 12,
    marginTop: 8,
    borderColor: "#ddd",
    borderWidth: 1
  },
  button: {
    color: "#111",
    fontSize: 14,
    fontWeight: "bold",
    display: "flex",
    gap: 3,
    flexDirection: "column"
  }
})