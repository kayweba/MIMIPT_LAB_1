import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

type Props = {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return children
}
