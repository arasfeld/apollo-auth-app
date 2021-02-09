import React from 'react'
import type { AppLayoutProps } from 'next/app'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { AuthProvider } from '../auth/auth-provider'
import { useApollo } from '../graphql/client'
import MainLayout from '../layouts/Main'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  const Layout = Component.Layout || MainLayout

  return (
    <React.Fragment>
      <Head>
        <title>Next GraphQL App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </React.Fragment>
  )
}

export default MyApp
