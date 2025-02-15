import { createContext } from "react";

interface AuthContext {
  isAuth: boolean;
  setIsAuth: (user: boolean) => void;
}

export const AuthContext = createContext<AuthContext>({
  isAuth: false,
  setIsAuth: () => {},
});
