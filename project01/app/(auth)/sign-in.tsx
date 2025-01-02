import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn, signOut } from "@/lib/appwrite";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import type { Models } from "react-native-appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
type Document = Models.Document;

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loggedIn, setLoggedIn, setUser } = useGlobalContext() as any;

  async function handleSubmit(): Promise<void> {
    //createDummyUser();
    if (!form.email) return alert("Email is required");
    if (!form.password) return alert("Password is required");

    setIsSubmitting(true);

    try {
      const res = await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setLoggedIn(true);
      setUser(result);
      if (res) router.replace("/home");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center px-4 gap-2 h-full pt-28 pb-2">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-28 h-10 mb-4"
          />
          <Text className="text-2xl text-white my-2 font-psemibold">
            Log In
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChange={(text) => setForm({ ...form, email: text })}
            placeholder="Enter your email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(text) => setForm({ ...form, password: text })}
            placeholder="Enter your password"
          />
          <Button
            title="Log In"
            handlePress={handleSubmit}
            containerStyles="mt-7 ml-4"
            isLoading={isSubmitting}
          />
          <Button
            title="Log out"
            handlePress={() => signOut()}
            containerStyles="mt-7 ml-4"
            isLoading={isSubmitting}
          />
          <Button
            title="Guest"
            handlePress={() => {
              router.push("/home");
            }}
            containerStyles="mt-7 ml-4"
            isLoading={isSubmitting}
          />
        </View>
        <View className="flex-row justify-center gap-2">
          <Text className="text-lg text-white font-pmedium">
            Don't have an account?
          </Text>
          <Link
            className="text-lg text-secondary-100 font-psemibold"
            href={"/sign-up"}
          >
            Sign Up
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
