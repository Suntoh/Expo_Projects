import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Suntoh", headerShown: false }}
      />
    </Stack>
  );
  // return(
  //   <Slot />  // return the index.tsx file
  // )
  //  return (
  //   <View style={styles.container}>
  //     <Text>Root Layout</Text>  //return this text
  //   </View>
  //  )
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
