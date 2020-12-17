import Head from 'next/head'
import React, { FormEvent, useCallback, useState } from 'react'
import styles from '../styles/Home.module.css'

const Signup: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    console.log('username:', username)
    event.preventDefault()
  }, [username, password, confirmPassword])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form method="post" onSubmit={onSubmit}>
          <label>
            Username:
            <input
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              type="text"
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              type="password" />
          </label>
          <label>
            Confirm Password:
            <input
              name="confirm-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
              type="password" />
          </label>
          <input type="submit" value="Signup" />
        </form>
      </main>
    </div>
  )
}

export default Signup
