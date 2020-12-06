import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import fetch from 'isomorphic-fetch'

const link = new HttpLink({
  uri: process.env.HTTP_BASE_URL,
  fetch
})

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: true
})
