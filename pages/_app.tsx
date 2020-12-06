import React, { ReactElement } from 'react'

import App from 'next/app'
import Head from 'next/head'

import ThemeProvider from '@material-ui/styles/ThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline'

import theme from 'src/config/theme'

import { ApolloProvider } from '@apollo/react-hooks'
import client from 'src/config/apollo'

class MyApp extends App {
  render(): ReactElement {
    const {
      Component,
      pageProps
    } = this.props

    return (
      <>
        <Head>
          <title>{'Sellect'}</title>
        </Head>
        <ThemeProvider
          theme={theme}
        >
          <CssBaseline />
          <ApolloProvider
            client={client}
          >
            <Component
              {...pageProps}
            />
          </ApolloProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default MyApp