
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ui/ThemedTextInput';
import ThemedScreen from '@/components/ui/ThemedScreen';
import Button from '@/components/ui/Button';

function Workout() {
  const local = useLocalSearchParams();
  const [name, setName] = useState("")
  const [targetReps, setTargetReps] = useState("10")

  const workout = useQuery(api.workouts.getWorkout, {
    id: local.workoutId as string
  })
  const updateWorkout = useMutation(api.workouts.update)
  const setIsDeleted = useMutation(api.workouts.setIsDeleted)

  useEffect(() => {
    if(workout) {
      setName(workout.name)
      setTargetReps(workout.targetReps.toString())
    }
  }, [workout])

  async function onSavePressed() {
    await updateWorkout({
      id: local.workoutId as string,
      name,
      targetReps: Number(targetReps)
    })
    router.back()
  }

  function onDeletePressed() {
    Alert.alert('Confirm', 'Are you sure you want to delete this workout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onConfirmDeletePressed,
        style: 'destructive'
      },
    ]);
  }

  async function onConfirmDeletePressed() {
    router.back()
    await setIsDeleted({
      id: local.workoutId as string,
      isDeleted: true
    })
  }

  return (
    <ThemedScreen>
      {!workout ? <ActivityIndicator size="large" /> : (
        <ThemedView>
          <ThemedView style={{ marginBottom: 8 }}>
            <ThemedText type="title">
              {workout.name}
            </ThemedText>
          </ThemedView>
          <ThemedView style={{
            display: "flex",
            flexDirection: "column",
            gap: 8
          }}>
            <Text>Name</Text>
            <ThemedTextInput
              value={name}
              onChangeText={val => setName(val)} />
            <Text>Target reps</Text>
            <ThemedTextInput
              keyboardType='numeric'
              value={targetReps}
              onChangeText={val => setTargetReps(val)} />
            <Button onPress={onSavePressed}>
              <Text>Save</Text>
            </Button>
            <Button onPress={onDeletePressed}>
              <Text>Delete</Text>
            </Button>
          </ThemedView>
        </ThemedView>
      )}
    </ThemedScreen>
  )
}

export default Workout