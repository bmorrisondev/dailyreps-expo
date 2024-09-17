import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ActivityIndicator, Text, FlatList, Pressable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SignOutButton from '@/components/SignOutButton';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { router } from 'expo-router';
import Button from '@/components/ui/Button';

export default function Settings() {
  const { user } = useUser()

  const workouts = useQuery(api.workouts.list)

  function onEditWorkoutClicked(id: string) {
    router.push(`/workouts/${id}`)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="cog" style={styles.headerImage} />}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Settings</ThemedText>
          <ThemedText type="defaultSemiBold">Signed in as {user?.emailAddresses[0].emailAddress}.</ThemedText>
        </ThemedView>
        <SignOutButton />
        <ThemedText type="subtitle">
          Edit workouts
        </ThemedText>
        {!workouts ? <ActivityIndicator size="large" /> : (
          <ThemedView style={styles.workoutList}>
            {workouts.map(w => (
              <Button
                key={w._id}
                onPress={() => onEditWorkoutClicked(w._id)}>
                <Text>
                  {w.name}
                </Text>
              </Button>
            ))}
          </ThemedView>
        )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  workoutList: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  workoutListItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 8
  }
});
