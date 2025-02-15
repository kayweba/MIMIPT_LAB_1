import { useMemo } from "react"

export const useAuth = () => {
  const user = useMemo(() => {
    return sessionStorage.getItem('user')
  }, [])

  return {
    user,
  }
}
