import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const AuthLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home" />
      </Tabs>
    </>
  );
};

export default AuthLayout;
