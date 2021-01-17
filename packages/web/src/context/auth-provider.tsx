import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'
import { AuthContext } from './auth-context'
import { setTokenInLocalStorage } from '../utils/local-storage'

const ME_QUERY = gql`
  query MeQuery {
    me {
      username
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`

export const AuthProvider: React.FC = ({ children }) => {
  const apolloClient = useApolloClient()
  const { data: meData, refetch } = useQuery(ME_QUERY)
  const [loginMutation] = useMutation(LOGIN_MUTATION)
  const [signupMutation] = useMutation(SIGNUP_MUTATION)

  const login = useCallback(async ({ username, password }) => {
    await apolloClient.resetStore()
    const { data } = await loginMutation({
      variables: {
        username,
        password
      }
    })
    if (data.login.token) {
      setTokenInLocalStorage(data.login.token)
      await refetch()
    }
  }, [apolloClient, loginMutation, refetch])

  const signup = useCallback(async ({ username, password }) => {
    await apolloClient.resetStore()
    const { data } = await signupMutation({
      variables: {
        username,
        password
      }
    })
    if (data.signup.token) {
      setTokenInLocalStorage(data.signup.token)
      await refetch()
    }
  }, [apolloClient, refetch, signupMutation])

  const logout = useCallback(async () => {
    localStorage.removeItem('token')
    await apolloClient.resetStore()
  }, [apolloClient])

  const value = useMemo(() => ({
    login,
    logout,
    signup,
    user: meData?.me
  }), [login, logout, signup, meData])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
