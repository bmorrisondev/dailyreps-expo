import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import ThemedTextInput from '@/components/ui/ThemedTextInput'
import Button from '@/components/ui/Button'
import OAuthButton from '@/components/OAuthButton'
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { styles } from "./styles"
import { Ionicons } from '@expo/vector-icons'

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
        await setActive({
          session: signInAttempt.createdSessionId
        })

        router.replace('/')
      } else {
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
      <View style={styles.form}>
        <ThemedView style={{ marginVertical: 16, alignItems: "center" }}>
          <ThemedText type='title'>
            Sign into Daily Reps
          </ThemedText>
          <ThemedText type='default'>
            Welcome back! Please sign in to continue
          </ThemedText>
        </ThemedView>

        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 8
        }}>
          <View style={{ flex: 1 }}>
            <OAuthButton strategy="oauth_google">
              <MaterialCommunityIcons name="google" size={18} />{" "}
              Google
            </OAuthButton>
          </View>
          <View style={{ flex: 1 }}>
            <OAuthButton strategy="oauth_github">
              <MaterialCommunityIcons name="github" size={18} />{" "}
              GitHub
            </OAuthButton>
          </View>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, height: 1, backgroundColor: '#eee'}} />
          <View>
            <Text style={{width: 50, textAlign: 'center', color: "#555"}}>or</Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#eee'}} />
        </View>

        <View style={{ gap: 8, marginBottom: 24 }}>
          <Text>Email address</Text>
          <ThemedTextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <Text>Password</Text>
          <ThemedTextInput
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <Button onPress={onSignInPress}>
          <Text>Sign in</Text> <Ionicons name='caret-forward' />
        </Button>

        <View style={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
          marginVertical: 18
        }}>
          <Text>Don't have an account?</Text>
          <Link href="/sign-up">
            <Text style={styles.signUpText}>Sign up</Text>
          </Link>
        </View>

      </View>
    </View>
  )
}