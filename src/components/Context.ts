import { createContext } from "react";

type UserContext = {
  name: string;
  avatar?: string;
};

export const userContext = createContext({} as UserContext);
export const UserProvider = userContext.Provider;
