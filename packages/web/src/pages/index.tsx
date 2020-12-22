import Head from 'next/head'
import React from 'react'
import { useAuth } from '../lib/use-auth'
import styles from '../styles/Home.module.css'

const Home: React.FC = () => {
  const { user } = useAuth()
  return (
    <React.Fragment>
      <h1 className={styles.title}>
        {!user ? "You're logged out." : `Welcome ${user.username}`}
      </h1>

      <p className={styles.description}>
        Get started by editing{' '}
        <code className={styles.code}>pages/index.js</code>
      </p>
    </React.Fragment>
  )
}

export default Home
