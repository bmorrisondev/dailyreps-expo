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
import Button from '@/components/ui/Button';
// import InAppBrowser from 'react-native-inappbrowser-reborn';



export default function Settings() {
  const { user } = useUser()
  const clerk = useClerk()

  const workouts = useQuery(api.workouts.list)

  function onEditWorkoutClicked(id: string) {
    router.push(`/workouts/${id}`)
  }

  async function onManageProfilePressed() {
    // console.log(clerk.client.signIn.supportedFirstFactors)
    // console.log(clerk.client.signIn.supportedSecondFactors)

    // const url = 'https://immortal-grizzly-78.clerk.accounts.dev/v1/client/handshake?redirect_url=https%3A%2F%2Fcooking-with-clerk.vercel.app%2Fsign-in'
    // const xhttp = new XMLHttpRequest();
    // xhttp = function () {
    //   console.log('progress')
    // }
    // xhttp.onreadystatechange = function() {
    //   // console.log('hit', xhttp.status, xhttp.responseText)
    //   if (this.readyState == 4 && this.status == 200) {
    //     // Typical action to be performed when the document is ready:
    //     console.log("DONE", xhttp.responseURL);
    //   }
    // };
    // xhttp.open("GET", url, true);
    // xhttp.send();

    // const res = await fetch('https://immortal-grizzly-78.clerk.accounts.dev/v1/client/handshake?redirect_url=https%3A%2F%2Fcooking-with-clerk.vercel.app%2Fsign-in', {
    //   redirect: "manual",
    //   // credentials: "include",
    //   // headers: {
    //   //   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
    //   // }
    // })
    // console.log('asdfasdf', new URL(res.url))
    // console.log(res)

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
