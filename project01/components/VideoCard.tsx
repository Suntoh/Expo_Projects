import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Post } from "@/type";
import { icons } from "@/constants";
import { ResizeMode, Video } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";

const VideoCard = (post: Post) => {
  const {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  } = post;

  const [isPlaying, setIsPlaying] = useState(false);

  const getVdoType = ({ post }: { post: Post }) => {
    console.log("post", post.video);
    if (post.video.includes("youtube")) {
      return { id: post.video.split("v=")[1], isYoutube: true };
    } else {
      return { id: post.video, isYoutube: false };
    }
  };

  const { id, isYoutube } = getVdoType({ post });

  return (
    <View className="flex-col items-center px-4 my-4 mb-8">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="border border-secondary w-[46px] h-[46px] rounded-lg justify-center items-center p-1">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white text-xl font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 text-sm font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-1">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {isPlaying ? (
        <View className="w-full rounded-lg mt-3 items-center justify-center">
          {isYoutube ? (
            <View className="mt-4">
              <YoutubePlayer
                videoId={id}
                height={250}
                width={350}
                webViewStyle={{
                  borderRadius: 20,
                  overflow: "hidden",
                  shadowRadius: 10,
                  shadowColor: "black",
                  shadowOpacity: 0.4,
                }}
                onChangeState={(state) => {
                  setIsPlaying(true);
                }}
              />
            </View>
          ) : (
            <Video
              source={{ uri: post.video }}
              shouldPlay
              isMuted={false}
              onPlaybackStatusUpdate={(status) => {
                if (status.isLoaded && status.didJustFinish) {
                  setIsPlaying(false);
                }
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              className="w-full h-60 rounded-xl overflow-hidden shadow-lg shadow-black/40"
            />
          )}
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPlaying(true)}
          className="w-full h-60 justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-16 h-16 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
