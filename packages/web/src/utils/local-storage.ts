const TOKEN_KEY = 'token'
export const getTokenFromLocalStorage = (): string | null => localStorage.getItem(TOKEN_KEY)
export const setTokenInLocalStorage = (token: string): void => localStorage.setItem(TOKEN_KEY, token)

const THEME_KEY = 'theme'
export const getThemeFromLocalStorage = (): string | null => localStorage.getItem(THEME_KEY)
export const setThemeInLocalStorage = (theme: string): void => localStorage.setItem(THEME_KEY, theme)
