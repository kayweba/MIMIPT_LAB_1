
import { BASE_URL, Routes } from "../constants/urls"
import { UserData } from "../models/UserData"
import { getRequestParams } from './utils/authUtils'

export class TodosService {
  public async getAll(userData: UserData | null) {
    const requestParams = getRequestParams({
      username: userData?.username ?? '',
      password: userData?.password ?? '',
      method: 'GET',
    })

    const response = await fetch(`${BASE_URL}${Routes.TODOS}`, requestParams)
    return response
  }

  public async addTodo(userData: UserData | null, text: string) {
    const requestParams = getRequestParams({
      username: userData?.username ?? '',
      password: userData?.password ?? '',
      method: 'POST',
      body: JSON.stringify({ task: text })
    })

    const response = await fetch(`${BASE_URL}/todo`, requestParams)
    return response
  }

  public async removeTodo(userData: UserData | null, id: number) {
    const requestParams = getRequestParams({
      username: userData?.username ?? '',
      password: userData?.password ?? '',
      method: 'DELETE',
    })

    const response = await fetch(`${BASE_URL}/todo/${id}`, requestParams)
    return response
  }

  public async updateTodo(userData: UserData | null, id: number, text: string) {
    const requestParams = getRequestParams({
      username: userData?.username ?? '',
      password: userData?.password ?? '',
      method: 'PUT',
      body: JSON.stringify({ task: text }),
    })

    const response = await fetch(`${BASE_URL}/todo/${id}?task=${text}`, requestParams)
    return response
  }
}

const todosService = new TodosService()
export default todosService
