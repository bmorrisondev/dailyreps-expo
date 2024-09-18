import { Image, StyleSheet, Platform, TextInput, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn } from '@clerk/clerk-expo';
import { Text } from 'react-native'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { router }  from 'expo-router';
import ThemedTextInput from '@/components/ui/ThemedTextInput';
import Button from '@/components/ui/Button';
import ThemedScreen from '@/components/ui/ThemedScreen';

function NewWorkout() {
  const [name, setName] = useState('');
  const [targetReps, setTargetReps] = useState('10')
  const addWorkout = useMutation(api.workouts.insert)

  async function onAddNewWorkoutPressed() {
    console.log(name, Number(targetReps))
    await addWorkout({
      name,
      targetReps: Number(targetReps)
    })
    router.back()
  }

  return (
    <ThemedScreen>
      <SignedIn>
        <ThemedView style={styles.stepContainer}>
          <Text>Name</Text>
          <ThemedTextInput
            value={name}
            onChangeText={setName} />
          <Text>Target reps</Text>
          <ThemedTextInput
            keyboardType='numeric'
            value={targetReps}
            onChangeText={setTargetReps} />
          <Button onPress={onAddNewWorkoutPressed}>
            Save
          </Button>
        </ThemedView>
      </SignedIn>
    </ThemedScreen>
  )
}

export default NewWorkout

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 12,
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
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  workoutRow: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center'
  }
});
