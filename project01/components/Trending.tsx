import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { act, useEffect, useState } from "react";
import { Post } from "@/type";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";
import { useVideoPlayer, VideoView } from "expo-video";
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

interface TrendingProps {
  posts: Post[] | undefined;
}

const zoomIn = {
  0: {
    scale: 0.8,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.8,
  },
};

const TrendingItem: React.FC<{ activeItem: Post; item: Post }> = ({
  activeItem,
  item,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const getVdoType = ({ item }: { item: Post }) => {
    if (item.video.includes("youtube")) {
      return { id: item.video.split("v=")[1], isYoutube: true };
    } else if (item.video.includes("youtu.be")) {
      return {
        id: item.video.split(".be/")[1].split("?si")[0],
        isYoutube: true,
      };
    } else {
      return { id: item.video, isYoutube: false };
    }
  };

  const { id, isYoutube } = getVdoType({ item });

  return (
    <Animatable.View
      animation={(activeItem.$id === item.$id ? zoomIn : zoomOut) as any}
      duration={500}
      className="mr-5"
    >
      {isPlaying ? (
        <View className="w-52 h-72 rounded-xl overflow-hidden shadow-lg shadow-black/40 items-center justify-center">
          {isYoutube ? (
            <View>
              <YoutubePlayer
                videoId={id}
                height={300}
                width={200}
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
              source={{ uri: item.video }}
              shouldPlay
              isMuted={false}
              onPlaybackStatusUpdate={(status) => {
                if (status.isLoaded && status.didJustFinish) {
                  setIsPlaying(false);
                }
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
            />
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => setIsPlaying(true)}
          className="relative justify-center items-center"
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="rounded-xl w-52 h-72 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 rounded-full absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<Post>(
    (posts?.[0] ?? {}) as Post
  );
  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<{ item: Post }>;
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };

  return (
    <View className="flex-row items-center">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center">
            <TrendingItem activeItem={activeItem} item={item} />
          </View>
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={
          {
            itemVisiblePercentThreshold: 70,
          } as any
        }
        contentOffset={{ x: 170, y: 0 }}
        horizontal
      />
    </View>
  );
};

export default Trending;
