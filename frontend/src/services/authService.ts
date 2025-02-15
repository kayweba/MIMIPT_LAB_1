import { getAuthHeader } from "./utils/authUtils"

class AuthService {
  public async auth(username: string, password: string): Promise<number> {
    console.log(username, password)
    const response = await fetch('http://127.0.0.1:8001' + '/auth', {
      headers: {
        ...getAuthHeader(username, password),
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })
    const result = await response.json()
    console.log(result)
    return response.status
  }
}

const authService = new AuthService()
export default authService
