
import { BASE_URL, Routes } from "../constants/urls"
import { getAuthHeader } from "./utils/authUtils"

export class TodosService {
  public async getAll() {
    const response = await fetch(`${BASE_URL}${Routes.TODOS}`, {
      headers: {
        ...getAuthHeader('', ''),
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'GET',
      credentials: 'include',
    })
    return response
  }

  public async addTodo(text: string) {
    const response = await fetch(`${BASE_URL}/todo`, {
      headers: {
        ...getAuthHeader('', ''),
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ task: text })
    })
    return response
  }

  public async removeTodo(id: number) {
    const response = await fetch(`${BASE_URL}/todo/${id}`, {
      headers: {
        ...getAuthHeader('', ''),
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'DELETE',
      credentials: 'include',
      // body: JSON.stringify({ task: text })
    })
    return response
  }

  public async updateTodo(id: number, text: string) {
    const response = await fetch(`${BASE_URL}/todo/${id}?task=${text}`, {
      headers: {
        ...getAuthHeader('', ''),
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({ task: text })
    })
    return response
  }
}

const todosService = new TodosService()
export default todosService
