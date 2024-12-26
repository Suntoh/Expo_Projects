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
import { router } from "expo-router";
import { useState } from "react";
import { getAllPost, getLatestPost } from "@/lib/appwrite";
import type { Data, Post } from "@/type";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [latest, setLatest] = useState<Post[] | undefined>(undefined);

  const fetchLatest = async () => {
    try {
      const response = await getLatestPost();
      setLatest(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPost();
      setPosts(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    fetchData();
    fetchLatest();
  };

  useEffect(() => {
    fetchData();
    fetchLatest();
  }, []);

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
            <View className="gap-1 mb-4 mt-2 flex-row min-w-[340px] justify-between items-center">
              <View>
                <Text className="text-xl font-pmedium text-white">
                  Welcome Back
                </Text>
                <Text className="text-3xl text-secondary font-psemibold">
                  Suntoh !
                </Text>
              </View>
              <View className="mt-2">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10 mt-2"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Video
              </Text>
              <Trending post={latest} />
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
              Be the first one to upload a video
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

export default Home;
