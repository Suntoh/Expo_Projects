import { Models } from "react-native-appwrite";

export interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
  creator: {
    username: string;
    avatar: string;
  };
  // Add other properties of the post object if needed
}

export interface uploadPost {
  userId: string;
  title: string;
  thumbnail: FileAsset | null;
  prompt: string;
  video: any;
}
export interface User {
  $id: string;
  email: string;
  username: string;
  avatar: string;
}

type Data = Models.Document | undefined;
