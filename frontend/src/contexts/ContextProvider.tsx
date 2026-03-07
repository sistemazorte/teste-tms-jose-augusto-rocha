import { createContext, useContext, useState } from "react";
import type { User } from "../types/User";

const StateContext = createContext({
  token: null as string | null,
  user: null as User | null,
  setUser: (() => {}) as (user: User | null) => void,
  setToken: (() => {}) as (token: string | null) => void,
});

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("ACCESS_TOKEN"),
  );

  const setToken = (token: string | null) => {
    _setToken(token);

    if (!token) {
      localStorage.removeItem("ACCESS_TOKEN");
      return;
    }

    localStorage.setItem("ACCESS_TOKEN", token);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContext = () => useContext(StateContext);
