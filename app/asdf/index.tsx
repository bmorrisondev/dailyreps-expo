import SignOutButton from '@/components/SignOutButton'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Button, Text, View } from 'react-native'

export default function Page() {
  const { user } = useUser()

  async function onSignOutPressed() {
    console.log("Sign out")
  }

  return (
    <View>
      <SignedIn>
        <Text>
          Hello {user?.emailAddresses[0].emailAddress}
          <SignOutButton />
        </Text>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}