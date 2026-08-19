import { useApolloClient, useMutation } from '@apollo/client'
import { AUTHORIZE } from '../graphql'
import { authStorage } from '../apolloClient'
export default function useSignIn() {
  const client = useApolloClient()
  const [mutate, result] = useMutation(AUTHORIZE)
  const signIn = async (credentials) => { const response = await mutate({ variables: { credentials } }); await authStorage.setAccessToken(response.data.authorize.accessToken); await client.resetStore(); return response }
  return [signIn, result]
}
