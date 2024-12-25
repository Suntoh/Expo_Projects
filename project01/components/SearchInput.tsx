import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

const SearchInput = ({}) => {
  return (
    <View className="border-2 border-black-200 rounded-lg bg-black-100 items-center flex-row px-4 py-2 w-full my-1">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder="Search"
        placeholderTextColor="#7b7b8b"
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
