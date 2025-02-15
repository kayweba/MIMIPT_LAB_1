
export const getAuthHeader = (username: string, password: string): Headers => {
  const encodedUseInfo = window.btoa(`${username}:${password}`)
  const headers: HeadersInit = new Headers()
  headers.set('Authorization', `Basic ${encodedUseInfo}`)
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Expose-Headers', '*')
  headers.set('Accept', 'application/json')
  return headers
}
