import { Image, StyleSheet, Platform, TextInput, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text } from 'react-native'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { router }  from 'expo-router';
import LogRepsButton from '@/components/LogRepsButton';


export default function HomeScreen() {
  const start = new Date()
  start.setHours(0,0,0,0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  console.log(start, end, start.getTime(), end.getTime())

  const workouts = useQuery(api.workouts.listWithReps, {
    start: start.getTime(),
    end: end.getTime()
  });

  function onAddNewWorkoutPressed() {
    router.push("/new-workout")
  }

  function onLogRepsPressed(_id: any): void {
    router.push(`/log/${_id}`)
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
          {!workouts ? <div>loading...</div> : (
            <>
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
                + New workout
              </Text>
            </Pressable>
            {workouts.map(({ _id, name, currentReps, targetReps }) => (
              <LogRepsButton key={_id}
                id={_id}
                name={name}
                currentReps={currentReps ?? 0}
                targetReps={targetReps ?? 0}
                onPress={onLogRepsPressed} />
            ))}
            </>
          )}

        </ThemedView>
      </SignedIn>
    </ParallaxScrollView>
  );
}

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
