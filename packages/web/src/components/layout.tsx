import Head from 'next/head'
import React from 'react'
import Header from './header'

const Layout: React.FC = ({ children }) => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main>
      {children}
    </main>
  </div>
)

export default Layout
