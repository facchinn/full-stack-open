import ReactDOM from 'react-dom/client'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { createClient } from 'graphql-ws'
import App from './App'
import './styles.css'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })
const authLink = setContext((_, { headers }) => ({ headers: { ...headers, authorization: window.localStorage.getItem('library-user-token') ? `Bearer ${window.localStorage.getItem('library-user-token')}` : '' } }))
const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000/graphql' }))
const link = split(({ query }) => { const definition = getMainDefinition(query); return definition.kind === 'OperationDefinition' && definition.operation === 'subscription' }, wsLink, authLink.concat(httpLink))
const client = new ApolloClient({ link, cache: new InMemoryCache() })
ReactDOM.createRoot(document.getElementById('root')).render(<ApolloProvider client={client}><App /></ApolloProvider>)
