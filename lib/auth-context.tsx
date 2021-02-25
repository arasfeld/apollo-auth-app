import { useApolloClient } from '@apollo/client'
import { createContext, useCallback, useContext, useMemo } from 'react'
import {
  LoginInput,
  RegisterInput,
  UserProfileFragment,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRegisterMutation
} from '../graphql/types'

interface AuthContextInterface {
  login: (input: LoginInput) => Promise<void>
  logout: () => Promise<void>
  register: (input: RegisterInput) => Promise<void>
  user?: UserProfileFragment
}

export const AuthContext = createContext<AuthContextInterface>({
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

export const AuthProvider: React.FC = ({ children }) => {
  const apolloClient = useApolloClient()
  const { data: meData, refetch } = useMeQuery()
  const [loginMutation] = useLoginMutation()
  const [logoutMutation] = useLogoutMutation()
  const [registerMutation] = useRegisterMutation()

  const login = useCallback(async (input: LoginInput) => {
    await apolloClient.resetStore()
    const { data } = await loginMutation({
      variables: { ...input }
    })
    if (data.login) {
      await refetch()
    }
  }, [apolloClient, loginMutation, refetch])

  const logout = useCallback(async () => {
    await logoutMutation()
    await apolloClient.resetStore()
  }, [apolloClient])

  const register = useCallback(async (input: RegisterInput) => {
    await apolloClient.resetStore()
    const { data } = await registerMutation({
      variables: { ...input }
    })
    if (data.register) {
      await refetch()
    }
  }, [apolloClient, refetch, registerMutation])

  const value = useMemo(() => ({
    login,
    logout,
    register,
    user: meData?.me
  }), [login, logout, register, meData])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext)
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
