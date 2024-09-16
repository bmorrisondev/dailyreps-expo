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
          <Text style={{ color: "#111", fontSize: 14, fontWeight: "bold" }}>
            Log reps for "{workout?.name}"
          </Text>
          <TextInput
            keyboardType='numeric'
            value={reps}
            onChangeText={setReps}
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
