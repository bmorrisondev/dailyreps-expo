import { Image, StyleSheet, TextInput, Pressable } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn } from '@clerk/clerk-expo';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { router }  from 'expo-router';
import Button from '@/components/ui/Button';
import ThemedScreen from '@/components/ui/ThemedScreen';
import { ThemedText } from '@/components/ThemedText';
import ThemedTextInput from '@/components/ui/ThemedTextInput';

function LogReps() {
  const local = useLocalSearchParams();
  const [reps, setReps] = useState('10')
  const workout = useQuery(api.workouts.getWorkout, {
    id: local.workoutId as string
  })
  const logReps = useMutation(api.workouts.logReps)


  async function onAddNewWorkoutPressed() {
    await logReps({
      workoutId: local.workoutId as string,
      reps: Number(reps)
    })
    router.back()
  }

  return (
    <ThemedScreen>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="title">
          {workout?.name}
        </ThemedText>
        <ThemedTextInput
          keyboardType='numeric'
          value={reps}
          onChangeText={setReps} />
        <Button onPress={onAddNewWorkoutPressed}>
          Save
        </Button>
      </ThemedView>
    </ThemedScreen>
  )
}

export default LogReps

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  workoutRow: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center'
  }
});
