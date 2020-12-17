import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import React from 'react'
import apolloClient from '../lib/apollo-client'
import '../styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
