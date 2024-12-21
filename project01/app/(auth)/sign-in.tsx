import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    console.log(form);
  };

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
