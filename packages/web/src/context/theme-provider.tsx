import { useCallback, useState, useMemo } from 'react'
import { Theme, ThemeContext } from './theme-context'
import { setThemeInLocalStorage } from '../utils/local-storage'

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light)

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.Light ? Theme.Dark : Theme.Light
    setTheme(newTheme)
    setThemeInLocalStorage(newTheme)
    if (newTheme === Theme.Light) {
      document.querySelector('html').classList.remove('dark')
    } else {
      document.querySelector('html').classList.add('dark')
    }
  }, [theme])

  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, setTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
