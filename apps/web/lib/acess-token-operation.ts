const KEY = 'lid'

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(KEY, accessToken)
}

export const getAccessToken = () => {
  return localStorage.getItem(KEY)
}

export const removeAccessToken = () => {
  localStorage.removeItem(KEY)
}
