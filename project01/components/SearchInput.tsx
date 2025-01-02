import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { setParams } from "expo-router/build/global-state/routing";

interface SearchInputProps {
  initialQuery?: string;
}

const SearchInput = ({ initialQuery }: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery);

  return (
    <View className="border-2 border-black-200 rounded-lg bg-black-100 items-center flex-row px-4 py-2 w-full my-1">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        placeholder="Search a Topic"
        placeholderTextColor="#cdcde0"
        onChange={(e) => setQuery(e.nativeEvent.text)}
        value={query}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please enter a search query");
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
