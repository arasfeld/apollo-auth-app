import { createContext, useContext } from 'react'

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeContextInterface {
  theme: Theme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: Theme.Light,
  toggleTheme: () => null,
})

export const useTheme = (): ThemeContextInterface => {
  const context = useContext(ThemeContext)
  if (typeof context === 'undefined') {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
