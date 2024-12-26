import { View, Text, FlatList } from "react-native";
import React from "react";
import { Post } from "@/type";

interface TrendingProps {
  post: Post[] | undefined;
}

const Trending: React.FC<TrendingProps> = ({ post }) => {
  return (
    <View className="flex-row items-center">
      <FlatList
        data={post}
        keyExtractor={(item) => item.title.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center">
            <Text className="text-3xl text-white">{item.title}</Text>
          </View>
        )}
        horizontal
      />
    </View>
  );
};

export default Trending;