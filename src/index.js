//Libraries
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo-hooks'
// ...Because of authorization for headers (instead of apollo-boost)
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
// ...For Subscriptions (websocket)
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
// Utilities
import config from './utilities/config'
// Components
import App from './App'

const wslink = new WebSocketLink({
  uri: config.wsUrl,
  options: { reconnect: true }
})

const httpLink = createHttpLink({
  uri: config.httpUrl
})

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('kaste-user-token'))
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token.value}` : null
    }
  }
})

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wslink,
  authLink.concat(httpLink),
)


const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'))