import { Link } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    // <View style={styles.container}>
    <View className="flex-1 items-center justify-center bg-[#d6b4fc]">
      <Text className="text-3xl font-pextrabold">Hello 👋</Text>

      <StatusBar style="auto" />
      <Link href="/home">
        <Text>Go to profile</Text>
      </Link>
    </View>
  );
}
