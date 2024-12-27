import { Models } from "react-native-appwrite";

export interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creater: {
    username: string;
    avatar: string;
  };
  // Add other properties of the post object if needed
}

type Data = Models.Document | undefined;
