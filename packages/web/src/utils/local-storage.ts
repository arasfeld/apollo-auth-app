const TOKEN_KEY = 'token'
export const getTokenFromLocalStorage = (): string | null => localStorage.getItem(TOKEN_KEY)
export const setTokenInLocalStorage = (token: string): void => localStorage.setItem(TOKEN_KEY, token)
