import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Constants from 'expo-constants'
import AuthStorage from './authStorage'

export const authStorage = new AuthStorage()
const uri = process.env.EXPO_PUBLIC_APOLLO_URI || Constants.expoConfig?.extra?.apolloUri || 'http://localhost:4000/graphql'
const httpLink = new HttpLink({ uri })
const authLink = setContext(async (_, { headers }) => {
  const token = await authStorage.getAccessToken()
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : '' } }
})
export default new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() })
