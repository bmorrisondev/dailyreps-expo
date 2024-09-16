import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import OAuthButtons from '@/components/OAuthButtons'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const styles = StyleSheet.create({
  screen: {
    padding: 10,
    display: "flex",
    gap: 8,
  },
  input: {
    display: "flex",
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 3,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    marginBottom: 10
  },
  signUpText: {
    color: "lightBlue",
    backgroundColor: "transparent",
    borderBottomWidth: 1
  }
});

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  if(!isLoaded) {
    return <ActivityIndicator size="large" />
  }

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        value={password}
        style={styles.input}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign In" onPress={onSignInPress} />
      <OAuthButtons />
      <View>
        <Text>Don't have an account?</Text>
      </View>
      <Link href="/sign-up">
        <Text style={styles.signUpText}>Sign up</Text>
      </Link>
    </View>
  )
}