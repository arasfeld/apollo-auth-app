import React from 'react'
import { useAuth } from '../context/auth-context'

const Home: React.FC = () => {
  const { user } = useAuth()
  return (
    <div className="container px-8 pt-24 pb-24 mx-auto lg:px-4">
      <h1>
        {!user ? "You're logged out." : `Welcome ${user.username}`}
      </h1>

      <p>
        Get started by editing{' '}
        <code>pages/index.js</code>
      </p>
    </div>
  )
}

export default Home
