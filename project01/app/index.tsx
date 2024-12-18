import { Link } from "expo-router";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import Button from "@/components/Button";
import { Redirect, router } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full p-4 justify-center items-center">
          <Image
            source={images.logo}
            className="w-25 h-10"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-90 h-80 w-full"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white text-center font-bold">
              Discover Endless Possbilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-36 h-4 absolute -bottom-2 -right-8"
              style={{ tintColor: "#007bff" }}
              resizeMode="contain"
            />
          </View>
          <Text className="text-gray-100 text-center mt-7 text-sm font-pregular">
            Where creativity meets innnovation: embark on a journey of limitless
            exploration with Aora.
          </Text>
          <Button
            title={"Continue"}
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles={"w-full mt-7"}
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
