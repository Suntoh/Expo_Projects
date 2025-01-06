import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { Post, uploadPost } from "@/type";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import Button from "@/components/Button";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createPost } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import YoutubePlayer from "react-native-youtube-iframe";
import * as ImagePicker from "expo-image-picker";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [isYoutube, setIsYoutube] = useState(false);
  const [id, setId] = useState("");
  const [form, setForm] = useState<uploadPost>({
    userId: user.$id,
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",
  });

  const Submit = async () => {
    if (!form.title) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    if (!form.video) {
      Alert.alert("Error", "Please upload a video");
      return;
    }
    if (!form.thumbnail) {
      Alert.alert("Error", "Please upload a thumbnail");
      return;
    }
    if (!form.prompt) {
      Alert.alert("Error", "Please enter a prompt");
      return;
    }
    setUploading(true);
    try {
      const response = await createPost(form);
      console.log(response);
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to upload video");
    } finally {
      setForm({
        userId: user.$id,
        title: "",
        thumbnail: null,
        video: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  useEffect(() => {
    //console.log(form.video.split(".be/")[1]);
    if (!form.video) return;
    const getVdoType = (item: any) => {
      if (typeof item === "string") {
        if (item.includes("youtube")) {
          setIsYoutube(true);
          setId(item.split("v=")[1]);
        }
        if (item.includes("youtu.be")) {
          setIsYoutube(true);
          setId(item.split(".be/")[1]);
        }
      } else {
        setIsYoutube(false);
        setId(item);
      }
    };
    getVdoType(form.video);
    //console.log(id, isYoutube);
  }, [form.video]);

  const openPicker = async (selectType: string) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:
          selectType === "video/*"
            ? ImagePicker.MediaTypeOptions.Videos
            : ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        if (selectType === "video/*") {
          setForm({ ...form, video: result.assets[0] });
        } else {
          setForm({ ...form, thumbnail: result.assets[0] });
        }
      } else {
        if (form.video != "") {
          setTimeout(() => {
            Alert.alert("Video Picked", JSON.stringify(result, null, 2));
          }, 100);
        } else if (form.thumbnail != "") {
          setTimeout(() => {
            Alert.alert("Thumbnail Picked", JSON.stringify(result, null, 2));
          }, 100);
        } else {
          setTimeout(() => {
            Alert.alert("Error", "No file selected");
          }, 100);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full  ">
      <ScrollView className="px-4 pt-8 h-full">
        <Text className="text-2xl text-white font-psemibold">
          Upload Viedeo
        </Text>
        <View className="mt-8 pr-2">
          <FormField
            title="Video Title"
            placeholder="Enter a title"
            value={form.title}
            handleChange={(e) => setForm({ ...form, title: e })}
          />
        </View>
        <View className="mt-7 space-y-4 px-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload your video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video/*")}>
            {form.video ? (
              <View>
                {isYoutube ? (
                  <YoutubePlayer
                    videoId={id}
                    height={300}
                    webViewStyle={{
                      borderRadius: 20,
                      overflow: "hidden",
                      shadowRadius: 10,
                      shadowColor: "black",
                      shadowOpacity: 0.4,
                    }}
                  />
                ) : (
                  <Video
                    source={{ uri: form.video.uri }}
                    className="w-full h-64 rounded-2xl"
                    isLooping
                    resizeMode={ResizeMode.COVER}
                    useNativeControls
                  />
                )}
              </View>
            ) : (
              <View className="w-full h-40 bg-black-100 border-2 border-black-200 rounded-2xl items-center justify-center">
                <View className="w-24 h-20 border border-dashed justify-center items-center border-secondary-100">
                  <Image
                    source={icons.upload}
                    className="w-9 h-9"
                    resizeMode="contain"
                    tintColor="#0068ff"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-sm text-gray-100 font-pmedium">
            Or attach a youtube link
          </Text>
          <FormField
            title="Youtube Link"
            placeholder="https://www.youtube.com/watch?v=..."
            value={form.video}
            handleChange={(e) => setForm({ ...form, video: e })}
          />
        </View>
        <View className="mt-5 space-y-4 w-full pr-2">
          <FormField
            title="Share your Prompt"
            placeholder="The prompt you use"
            value={form.prompt}
            handleChange={(e) => setForm({ ...form, prompt: e })}
          />
        </View>
        <View className="mt-7 space-y-4 px-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload a thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker("image/*")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="flex-row w-full h-20 bg-black-100 border-2 border-black-200 rounded-2xl items-center justify-center">
                <Image
                  source={icons.upload}
                  className="w-7 h-7"
                  resizeMode="contain"
                  tintColor="#0068ff"
                />
                <Text className="text-sm text-gray-100 font-pmedium ml-2">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="pb-20">
          <Button
            title="Submit"
            handlePress={Submit}
            containerStyles="mt-7 ml-1"
            isLoading={uploading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
