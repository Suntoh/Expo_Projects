import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

import { ReactNode } from "react";

const GlobalProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);
  const [user, setUser] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

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
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return( 
    <GlobalContext.Provider value={{
    loggedIn,
    setLoggedIn,
    user,
    setUser,
    isLoading,
  }}>{children}
  </GlobalContext.Provider>;
)};
