
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

function Workout() {
  const local = useLocalSearchParams();
  const workout = useQuery(api.workouts.getWorkout, {
    id: local.workoutId as string
  })

  return (
    <div>
      Workout: {JSON.stringify(workout)}
    </div>
  )
}

export default Workout