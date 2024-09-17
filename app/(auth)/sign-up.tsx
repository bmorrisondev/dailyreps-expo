import * as React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { styles } from './styles'
import ThemedTextInput from '@/components/ui/ThemedTextInput'
import Button from '@/components/ui/Button'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import OAuthButton from '@/components/OAuthButton'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code'
      })

      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        {!pendingVerification && (
          <>
            <ThemedView style={{ marginVertical: 16, alignItems: "center" }}>
              <ThemedText type='title'>
                Create your account
              </ThemedText>
              <ThemedText type='default'>
                Welcome! Please fill in the details to get started.
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
                <Text style={{width: 50, textAlign: 'center'}}>or</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: '#eee'}} />
            </View>

            <Text>Email address</Text>
            <ThemedTextInput
              autoCapitalize="none"
              value={emailAddress}
              onChangeText={(email) => setEmailAddress(email)}
            />
            <Text>Password</Text>
            <ThemedTextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
            <Button onPress={onSignUpPress}>
              <Text>Continue</Text> <Ionicons name='caret-forward' />
            </Button>

            <View style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
              justifyContent: "center",
              marginVertical: 18
            }}>
              <Text>Already have an account?</Text>
              <Link href="/sign-in">
                <Text style={styles.signUpText}>Sign in</Text>
              </Link>
            </View>
          </>
        )}

        {pendingVerification && (
          <>
            <ThemedTextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)} />
            <Button onPress={onPressVerify}>
              Verify code
            </Button>
          </>
        )}

      </View>
    </View>
  )
}