import { gql, useApolloClient, useMutation } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, useCallback, useState } from 'react'
import { useAuth } from '../lib/use-auth'
import styles from '../styles/Login.module.css'

const LoginMutation = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`

const Login: React.FC = () => {
  const { refetch } = useAuth({ redirectTo: '/', redirectIfFound: true })
  const apolloClient = useApolloClient()
  const [login] = useMutation(LoginMutation)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await apolloClient.resetStore()
    const { data } = await login({
      variables: {
        username,
        password
      }
    })
    if (data.login.token) {
      localStorage.setItem('token', data.login.token)
      await refetch()
      router.push('/')
    }
  }, [username, password])

  return (
    <div className={styles.card}>
      <form method="post" onSubmit={onSubmit}>
        <label>
          Username:
          <input
            autoComplete="username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            value={username}
            type="text"
          />
        </label>
        <label>
          Password:
          <input
            autoComplete="current-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            value={password}
            type="password" />
        </label>
        <input type="submit" value="Log In" />
      </form>
      <hr />
      <Link href="/signup">Sign Up</Link>
    </div>
  )
}

export default Login
