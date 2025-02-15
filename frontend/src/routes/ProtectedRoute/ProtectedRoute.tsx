import { ReactNode, useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

type Props = {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { isAuth } = useContext(AuthContext)

  if (!isAuth) {
    return <Navigate to={'/login'} />
  }

  return children
}
