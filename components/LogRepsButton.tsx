'use client'
// import { RepRecord, Workout, WorkoutTypeEnum } from '@/models'
import { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { Text, Pressable, StyleSheet } from 'react-native'

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
    // if (workout.type === WorkoutTypeEnum.Count) {
    //   setProgressStr(`${currentReps}/${workout.targetreps}`)
    // } else {
    //   setProgressStr(`${secondsToTimestamp(currentReps)}/${secondsToTimestamp(workout.targetreps as number)}`)
    // }
  }, [])

  return (
    <Pressable
      style={styles.pressable}
      onPress={() => onPress(id)}
    >
      <Text style={styles.button}>
        {name} ({progressStr})
        <ProgressBar reps={currentReps} targetReps={targetReps} />
      </Text>
    </Pressable>
    // <Button variant='secondary' className='w-full flex flex-col'>
    //   {name} ({progressStr})
    //   <ProgressBar reps={currentReps} targetReps={targetReps} />
    // </Button>
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