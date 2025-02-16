import { getRequestParams } from "./utils/authUtils"

class AuthService {
  public async auth(username: string, password: string): Promise<number> {
    const requestParams = getRequestParams({
      username,
      password,
      method: 'GET',
    })

    const response = await fetch('http://127.0.0.1:8001' + '/auth', requestParams)
    return response.status
  }
}

const authService = new AuthService()
export default authService
