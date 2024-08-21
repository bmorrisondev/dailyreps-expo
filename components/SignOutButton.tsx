import { Text, Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const onSignOutPress = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (err: any) {}
  };

  return (
    <Pressable
      style={{
        borderRadius: 5,
        backgroundColor: "#eeeeee",
        padding: 12,
        marginTop: 8,
        borderColor: "#ddd",
        borderWidth: 1
      }}
      onPress={onSignOutPress}
    >
      <Text style={{ color: "#111", fontSize: 14, fontWeight: "bold" }}>
        Sign out
      </Text>
    </Pressable>
  );
}