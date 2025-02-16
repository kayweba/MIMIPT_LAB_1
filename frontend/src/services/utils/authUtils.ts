
type RequestParams = {
  username: string
  password: string
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  body?: BodyInit
}

export const getRequestParams = (params: RequestParams): RequestInit => {
  const encodedUseInfo = window.btoa(`${params.username}:${params.password}`)
  const headers: HeadersInit = new Headers()
  headers.set('Authorization', `Basic ${encodedUseInfo}`)
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Expose-Headers', '*')
  headers.set('Accept', 'application/json')
  headers.set('Content-Type', 'application/json')
  const requestInit: RequestInit = {
    headers,
    mode: 'cors',
    method: params.method,
    credentials: 'include',
    body: params.body,
  }
  return requestInit
}
