import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { Post, User } from "@/type";
import { getUserPost, signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "@/components/VideoCard";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";

const Profile = () => {
  const { user, setUser, setLoggedIn } = useGlobalContext();
  let user0 = user as User;
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (userId: string) => {
    setIsLoading(true);
    try {
      const response = await getUserPost(userId);
      setPosts(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    fetchData(user.$id);
  };

  useEffect(() => {
    user0 = user as User;
    refetch();
  }, [user.$id]);

  console.log("user", user.$id);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.title.toString()}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mr-4 mb-8"
              onPress={signOut}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-9 h-9"
              />
            </TouchableOpacity>
            <View className="w-24 h-24 rounded-full border-2 border-secondary justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-full"
              />
            </View>
            <InfoBox user={user0} />
          </View>
        )}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default Profile;
