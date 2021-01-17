import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, useCallback, useState } from 'react'
import { Button, TextField } from '../components'
import { useAuth } from '../context/auth-context'

const Login: React.FC = () => {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login({ username, password })
      .then(() => {
        router.push('/')
      })
  }, [username, password, login, router])

  return (
    <div className="container px-8 pt-24 pb-24 mx-auto lg:px-4">
      <form
        className="flex flex-col w-full p-8 mx-auto mt-10 border rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0"
        method="post"
        onSubmit={onSubmit}
      >
        <TextField
          autoComplete="username"
          label="Username"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          value={username}
          type="text"
        />
        <TextField
          autoComplete="current-password"
          label="Password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          value={password}
          type="password"
        />
        <Button type="submit">Log In</Button>
        <hr className="bg-white bg-opacity-10 border-none h-1 m-0" />
        Don't have an account?
        <Link href="/signup">Sign Up</Link>
      </form>
    </div>
  )
}

export default Login
