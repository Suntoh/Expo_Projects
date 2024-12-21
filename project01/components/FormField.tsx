import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { icons } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  handleChange: (text: string) => void;
  placeholder: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="gap-2 pt-4 pb-2 mx-1">
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row w-full h-14 px-4 bg-black-100 border-2 border-black-200 rounded-lg focus:border-secondary-100 items-center">
        <TextInput
          className="flex-1 text-white font-psemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            className="px-2 py-1"
          >
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-7 h-7"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
