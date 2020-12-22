import { gql, useApolloClient, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { FormEvent, useCallback, useState } from 'react'
import { useAuth } from '../lib/use-auth'
import styles from '../styles/Home.module.css'

const SignupMutation = gql`
  mutation SignupMutation($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`

const Signup: React.FC = () => {
  const { refetch } = useAuth({ redirectTo: '/', redirectIfFound: true })
  const apolloClient = useApolloClient()
  const [signup] = useMutation(SignupMutation)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await apolloClient.resetStore()
    const { data } = await signup({
      variables: {
        username,
        password
      }
    })
    if (data.signup.token) {
      localStorage.setItem('token', data.signup.token)
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
          New Password:
          <input
            autoComplete="new-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="New Password"
            value={password}
            type="password" />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )
}

export default Signup
