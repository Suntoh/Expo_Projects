import { View, Text } from "react-native";
import React from "react";
import { User } from "@/type";

const InfoBox = ({ user }: { user: User }) => {
  return (
    <View className="pt-4">
      <Text className={`text-white text-center text-xl font-psemibold`}>
        {user.username}
      </Text>
      <View className="flex-row justify-between items-center w-full px-24 mt-5">
        <View className="flex justify-between items-center">
          <Text className="text-white font-pbold text-lg">3</Text>
          <Text className="text-gray-100 text-center font-pregular text-sm">
            Post
          </Text>
        </View>
        <View className="flex justify-between items-center">
          <Text className="text-white font-pbold text-lg">5</Text>
          <Text className="text-gray-100 text-center font-pregular text-sm">
            Followers
          </Text>
        </View>
      </View>
    </View>
  );
};

export default InfoBox;
