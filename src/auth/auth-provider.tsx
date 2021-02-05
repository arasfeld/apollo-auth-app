import { useApolloClient } from '@apollo/client'
import React, { useCallback, useMemo } from 'react'
import { AuthContext } from './auth-context'
import {
  LoginInput,
  RegisterInput,
  useLoginMutation,
  useMeQuery,
  useRegisterMutation
} from '../graphql/types'

export const AuthProvider: React.FC = ({ children }) => {
  const apolloClient = useApolloClient()
  const { data: meData, refetch } = useMeQuery()
  const [loginMutation] = useLoginMutation()
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
    localStorage.removeItem('token')
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
