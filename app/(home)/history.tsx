import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SignOutButton from '@/components/SignOutButton';
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import Button from '../../components/ui/Button';
import WorkoutHistoryList from '../../components/WorkoutHistoryList';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


export default function Settings() {
  const [date, setDate] = useState(new Date())

  function onPreviousDatePressed() {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d)
  }

  function onNextDatePressed() {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    setDate(d)
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Workout history</ThemedText>
        </ThemedView>
        <ThemedView style={styles.dateNavRow}>
          <Button onPress={onPreviousDatePressed}>
            <FaAngleLeft />
          </Button>
          <div style={styles.date}>{date.toLocaleDateString()}</div>
          <Button onPress={onNextDatePressed}>
            <FaAngleRight />
          </Button>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <WorkoutHistoryList date={date} />
        </ThemedView>
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
  dateNavRow: {
    gap: 8,
    marginBottom: 8,
    display: "flex",
    flexDirection: "row",
  },
  date: {
    flex: 1,
    alignItems: "center",
    display: "flex",
    fontSize: 18,
    fontWeight: "bold",
    padding: 4
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8
  },
});
