import { useState } from "react"

export const useAuth = () => {
  // we can re export the user methods or object from this hook
  const [isAuth, setIsAuth] = useState<boolean>(false)

  return { isAuth, setIsAuth }
};
