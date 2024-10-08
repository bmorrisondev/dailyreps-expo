import { Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { Text } from 'react-native'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { router }  from 'expo-router';
import LogRepsButton from '@/components/LogRepsButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '@/components/ui/Button';
// import LogRepsButton from '@/components/LogRepsButton';


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
      headerImage={<Ionicons size={310} name="list-circle-outline" style={styles.headerImage} />}>

      <ThemedView style={styles.stepContainer}>
        {!workouts ? <ActivityIndicator size="large" /> : (
          <>
          <Button onPress={onAddNewWorkoutPressed}>
            <Ionicons size={16} name="add-outline" /> New workout
          </Button>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerImage: {
    color: '#067EA4',
    bottom: -90,
    left: -35,
    position: 'absolute',
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
