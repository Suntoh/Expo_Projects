import { getCurrentUser } from "@/lib/appwrite";
// import type { Models } from "react-native-appwrite";
// type Document = Models.Document;
import { createContext, useContext, useEffect, useState } from "react";

// interface GlobalContextType {
//   loggedIn: boolean;
//   setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
//   user: Document | null;
//   setUser: React.Dispatch<React.SetStateAction<Document | null>>;
//   isLoading: boolean;
// }
//having problems with typescript

export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUser(res);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ loggedIn, setLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
