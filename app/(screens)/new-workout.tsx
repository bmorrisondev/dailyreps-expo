import { Image, StyleSheet, Platform, TextInput, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn } from '@clerk/clerk-expo';
import { Text } from 'react-native'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { router }  from 'expo-router';

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
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    headerImage={
      <Image
        source={require('@/assets/images/partial-react-logo.png')}
        style={styles.reactLogo}
      />
    }>
      <SignedIn>
        <ThemedView style={styles.stepContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input} />
          <TextInput
            keyboardType='numeric'
            value={targetReps}
            onChangeText={setTargetReps}
            style={styles.input} />
          <Pressable
            style={{
              borderRadius: 5,
              backgroundColor: "#eeeeee",
              padding: 12,
              marginTop: 8,
              borderColor: "#ddd",
              borderWidth: 1
            }}
            onPress={onAddNewWorkoutPressed}
          >
            <Text style={{ color: "#111", fontSize: 14, fontWeight: "bold" }}>
              Save
            </Text>
          </Pressable>
        </ThemedView>
      </SignedIn>
    </ParallaxScrollView>
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