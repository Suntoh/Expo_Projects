import { Models } from "react-native-appwrite";

export interface Post {
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creater: string;
  // Add other properties of the post object if needed
}

type Data = Models.Document | undefined;
