import * as SecureStore from 'expo-secure-store'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ConvexReactClient } from 'convex/react';
import { ClerkLoaded, ClerkProvider, SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { ConvexProviderWithClerk } from "convex/react-clerk";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkLoaded>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <SignedIn>
              <Stack>
                <Stack.Screen name="(home)" options={{
                  headerShown: false,
                  title: "Home"
                }} />
                <Stack.Screen name="(screens)/new-workout" options={{
                  title: "New workout",
                  contentStyle: {
                    backgroundColor: "white"
                  }
                }} />
                <Stack.Screen name="(screens)/log/[workoutId]" options={{
                  title: "Log reps",
                  contentStyle: {
                    backgroundColor: "white",
                    paddingTop: 8
                  }
                }} />
                <Stack.Screen name="(screens)/workouts/[workoutId]" options={{
                  title: "Edit workout",
                  contentStyle: {
                    backgroundColor: "white",
                    paddingTop: 8
                  }
                }} />
                <Stack.Screen name="(screens)/edit-entry/[entryId]" options={{
                  title: "Edit entry",
                  contentStyle: {
                    backgroundColor: "white",
                    paddingTop: 8
                  }
                }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </SignedIn>
            <SignedOut>
              <Stack>
                <Stack.Screen name="(auth)" options={{
                  headerShown: false
                }} />
              </Stack>
            </SignedOut>
          </ThemeProvider>
        </ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
