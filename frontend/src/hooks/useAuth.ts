import { useState } from "react"
import { UserData } from "../models/UserData";

export const useAuth = () => {
  // we can re export the user methods or object from this hook
  const [userData, setUserData] = useState<UserData | null>(null)

  return { userData, setUserData }
};
