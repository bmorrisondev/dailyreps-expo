import { Text, Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import Button from "./ui/Button";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const onSignOutPress = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (err: any) {}
  };

  return (
    <Button onPress={onSignOutPress}>
      Sign out
    </Button>
  );
}