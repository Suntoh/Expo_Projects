import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView, ScrollView, Image } from "react-native";
import { images } from "@/constants";
import { useState } from "react";
import FormField from "@/components/FormField";
import { Link } from "expo-router";
import Button from "@/components/Button";

const SignUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleSubmit(): void {
    throw new Error("Function not implemented.");
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
