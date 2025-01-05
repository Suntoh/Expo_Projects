import { Data, Post, uploadPost } from "@/type";
import { router } from "expo-router";
import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  ImageGravity,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.suntoh.aora",
  projectId: "67663f98002ca5008aaf",
  databaseId: "676641640020302d3880",
  userCollectionId: "676641890011c5be692e",
  vdoCollectionId: "676641a9000e25a1a96b",
  storageId: "6766441b001f8653217e",
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint) // Your API Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your platform name

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createDummyUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "Jane Doe").then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatar.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Error", "An unknown error occurred");
    }
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession("current");
    router.replace("/sign-in");
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAcount = await account.get();
    if (!currentAcount) throw new Error("User not found");

    const currnetUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAcount.$id)]
    );
    if (!currnetUser) throw new Error("User not found");

    return currnetUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.vdoCollectionId
    );
    return posts.documents as unknown as Post[];
  } catch (error) {
    console.log(error);
  }
};

export const getLatestPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.vdoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(9)]
    );
    return posts.documents as unknown as Post[];
  } catch (error) {
    console.log(error);
  }
};

export const searchPost = async (query: string): Promise<Post[]> => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.vdoCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents as unknown as Post[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUserPost = async (userId: string): Promise<Post[]> => {
  try {
    console.log("userId", userId);
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.vdoCollectionId,
      [Query.equal("creator", userId)]
    );
    return posts.documents as unknown as Post[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFilePreview = async (
  fileId: string,
  type: string
): Promise<URL> => {
  let fileUrl = new URL("about:blank");
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top" as ImageGravity,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw new Error("File not found");
    console.log(fileUrl);
    return fileUrl;
  } catch (error) {
    console.log(error);
    return fileUrl;
  }
};

interface FileAsset {
  mimeType: string;
  [key: string]: any;
}

export const uploadFile = async (file: any, type: string): Promise<URL> => {
  if (!file) return new URL("about:blank");
  const { mimeType, ...rest } = file;
  const asset = {
    type: mimeType,
    ...rest,
  };
  try {
    const uploadFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
    console.log(uploadFile, type);
    const fileUrl = await getFilePreview(uploadFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPost = async (post: uploadPost) => {
  try {
    if (typeof post.video === "string") {
      const thumbnail = await uploadFile(post.thumbnail, "image");
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.vdoCollectionId,
        ID.unique(),
        {
          title: post.title,
          thumbnail,
          prompt: post.prompt,
          video: post.video,
          creator: post.userId,
        }
      );
      return newPost;
    } else {
      const [thumbnail, video] = await Promise.all([
        uploadFile(post.thumbnail, "image"),
        uploadFile(post.video, "video"),
      ]);
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.vdoCollectionId,
        ID.unique(),
        {
          title: post.title,
          thumbnail,
          prompt: post.prompt,
          video,
          creator: post.userId,
        }
      );
      return newPost;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
