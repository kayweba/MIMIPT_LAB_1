import { createContext } from 'react';
import { UserData } from '../models/UserData';

interface AuthContext {
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
  // isAuth: boolean;
  // setIsAuth: (user: boolean) => void;
}

export const AuthContext = createContext<AuthContext>({
  userData: {username: '', password: ''},
  setUserData: () => {},
});
