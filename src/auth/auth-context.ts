import { createContext, useContext } from 'react'
import type { LoginInput, RegisterInput, UserInfoFragment } from '../graphql/types'

interface AuthContextInterface {
  login: (input: LoginInput) => Promise<void>
  logout: () => Promise<void>
  register: (input: RegisterInput) => Promise<void>
  user?: UserInfoFragment
}

export const AuthContext = createContext<AuthContextInterface>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext)
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
