import { View, Text, Alert } from "react-native";
import React from "react";
import { SafeAreaView, ScrollView, Image } from "react-native";
import { images } from "@/constants";
import { useState } from "react";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import Button from "@/components/Button";
import { createDummyUser, createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const { setUser, setLoggedIn } = useGlobalContext() as any;
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function handleSubmit(): Promise<void> {
    //createDummyUser();
    if (!form.email) return alert("Email is required");
    if (!form.password) return alert("Password is required");
    if (!form.username) return alert("Username is required");

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setLoggedIn(true);

      router.replace("/home");
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
            Sign Up
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChange={(text) => setForm({ ...form, username: text })}
            placeholder="Enter your username"
          />
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
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles="mt-7 ml-4"
            isLoading={isSubmitting}
          />
        </View>
        <View className="flex-row justify-center gap-2">
          <Text className="text-lg text-white font-pmedium">
            Already have an account?
          </Text>
          <Link
            className="text-lg text-secondary-100 font-psemibold"
            href={"/sign-in"}
          >
            Sign In
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
