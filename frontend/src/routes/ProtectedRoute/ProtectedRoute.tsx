import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

type Props = {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { userData } = useContext(AuthContext)

  if (!userData) {
    return <Navigate to={'/login'} />
  }

  return children
}
