'use client'
import { useEffect, useState } from 'react'
import ProgressBar from './ProgressBar'
import { Text } from 'react-native'
import ListItem from './ListItem'

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
    <ListItem onPress={() => onPress(id)}>
      <Text>{name} ({progressStr})</Text>
      <ProgressBar reps={currentReps} targetReps={targetReps} />
    </ListItem>
  )
}

export default LogRepsButton