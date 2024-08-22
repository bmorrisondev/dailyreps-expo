import { Image, StyleSheet, Platform, TextInput, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text } from 'react-native'
import SignOutButton from '@/components/SignOutButton';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { router }  from 'expo-router';
import LogRepsButton from '@/components/LogRepsButton';


export default function HomeScreen() {
  const { user } = useUser()
  const [newWorkout, setNewWorkout] = useState('');
  const workouts = useQuery(api.workouts.listWithReps);
  // const addWorkout = useMutation(api.workouts.insert)
  // const deleteWorkout = useMutation(api.workouts.remove)

  // async function onAddNewWorkoutPressed() {
  //   await addWorkout({
  //     name: newWorkout
  //   })
  //   setNewWorkout("")
  // }

  // async function onDeleteWorkoutPressed(id: string) {
  //   await deleteWorkout({
  //     id
  //   })
  // }

  // async function handleInputEnterPressed(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
  //   if(e.nativeEvent.key === "Enter") {
  //     await onAddNewWorkoutPressed()
  //   }
  // }

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
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome {user?.emailAddresses[0].emailAddress}!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          {/* <TextInput
            value={newWorkout}
            onChangeText={setNewWorkout}
            style={styles.input}
            onKeyPress={handleInputEnterPressed} /> */}
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
              New workout
            </Text>
          </Pressable>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
            {workouts?.map(({ _id, name, currentReps, targetReps }) => (
              <LogRepsButton key={_id}
                id={_id}
                name={name}
                currentReps={currentReps ?? 0}
                targetReps={targetReps ?? 0}
                onPress={onLogRepsPressed} />
              // <ThemedView key={_id} style={styles.workoutRow}>
              //   <Text key={_id}>• {name}</Text>
              //   <Pressable
              //     style={{
              //       borderRadius: 5,
              //       backgroundColor: "#eeeeee",
              //       padding: 12,
              //       marginTop: 8,
              //       borderColor: "#ddd",
              //       borderWidth: 1
              //     }}
              //     onPress={() => onDeleteWorkoutPressed(_id)}
              //   >
              //     <Text style={{ color: "#111", fontSize: 14, fontWeight: "bold" }}>
              //       X
              //     </Text>
              //   </Pressable>
              // </ThemedView>
            ))}
        </ThemedView>

        {/* <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in this starter app.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            When you're ready, run{' '}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView> */}
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
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
