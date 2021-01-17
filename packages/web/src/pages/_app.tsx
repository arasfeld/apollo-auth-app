import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import React from 'react'
import { Layout } from '../components'
import { AuthProvider } from '../context/auth-provider'
import { apolloClient } from '../utils/apollo-client'
import '../styles/index.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
