import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SignOutButton from '@/components/SignOutButton';
import React from 'react';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { router } from 'expo-router';
import ListItem from '@/components/ListItem';
// import InAppBrowser from 'react-native-inappbrowser-reborn';



export default function Settings() {
  const { user } = useUser()
  const clerk = useClerk()

  const workouts = useQuery(api.workouts.list)

  function onEditWorkoutClicked(id: string) {
    router.push(`/workouts/${id}`)
  }

  function onManageProfilePressed() {
    // router.push('/profile')

    // const url = "https://popular-corgi-5.accounts.dev/user"
    // Linking.openURL(url)
    // const profileUrl = cler
    // const profileUrl = clerk.openUserProfile()
    // console.log(profileUrl)
  }

  // async function openLink() {
  //   try {
  //     const isAvailable = await InAppBrowser.isAvailable()
  //     const url = 'https://www.google.com'
  //     if (isAvailable) {
  //       InAppBrowser.open(url, {
  //         // iOS Properties
  //         dismissButtonStyle: 'cancel',
  //         preferredBarTintColor: 'gray',
  //         preferredControlTintColor: 'white',
  //         // Android Properties
  //         showTitle: true,
  //         toolbarColor: '#6200EE',
  //         secondaryToolbarColor: 'black',
  //         enableUrlBarHiding: true,
  //         enableDefaultShare: true,
  //         forceCloseOnRedirection: true,
  //       }).then((result) => {
  //         Alert.alert(JSON.stringify(result))
  //       })
  //     } else Linking.openURL(url)
  //   } catch (error) {
  //     Alert.alert(error.message)
  //   }
  // }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="cog" style={styles.headerImage} />}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Settings</ThemedText>
          <ThemedText type="defaultSemiBold">Signed in as {user?.emailAddresses[0].emailAddress}.</ThemedText>
        </ThemedView>
        {/* <Button onPress={onManageProfilePressed}>
          Manage profile
        </Button> */}
        <SignOutButton />
        <ThemedText type="subtitle">
          Edit workouts
        </ThemedText>
        {!workouts ? <ActivityIndicator size="large" /> : (
          <ThemedView style={styles.workoutList}>
            {workouts.map(w => (
              <ListItem
                key={w._id}
                onPress={() => onEditWorkoutClicked(w._id)}>
                <Text>
                  {w.name}
                </Text>
              </ListItem>
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
