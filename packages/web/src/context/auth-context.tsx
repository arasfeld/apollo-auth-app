import { createContext, useContext } from 'react'

type User = { username: string }
type LoginArgs = { username: string, password: string }
type SignupArgs = { username: string, password: string }

interface AuthContextInterface {
  login: (args: LoginArgs) => Promise<void>
  logout: () => Promise<void>
  signup: (args: SignupArgs) => Promise<void>
  user?: User
}

export const AuthContext = createContext<AuthContextInterface>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  signup: () => Promise.resolve(),
})

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext)
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
