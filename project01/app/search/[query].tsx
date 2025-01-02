import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import Button from "@/components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { getAllPost, getLatestPost, searchPost } from "@/lib/appwrite";
import type { Data, Post } from "@/type";
import VideoCard from "@/components/VideoCard";
import { Query } from "react-native-appwrite";

const Search = () => {
  const { query } = useLocalSearchParams() as { query: string };
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await searchPost("Hi");
      setPosts(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    fetchData(query);
  };

  useEffect(() => {
    fetchData(query);
  }, [query]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        //data={[]}
        keyExtractor={(item) => item.title.toString()}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="mt-4 mx-4 ">
            <Text className="text-xl font-pmedium text-white">Results</Text>
            <Text className="text-3xl text-secondary font-psemibold">
              {query}
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="justify-center items-center px-4">
            <Image
              source={images.empty}
              className="w-80 h-60"
              resizeMode="contain"
            />
            <Text className="text-2xl font-psemibold mt-2 text-white">
              No Videos Found
            </Text>
            <Text className="text-sm font-pmedium text-gray-100">
              No video found for this title
            </Text>
            <Button
              title="Upload Video"
              handlePress={() => {
                router.push("/create");
              }}
              containerStyles="px-10 my-6"
            />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
