import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql'
export default function useRepositories(variables) {
  const result = useQuery(GET_REPOSITORIES, { variables: { first: 8, ...variables }, fetchPolicy: 'cache-and-network' })
  const handleFetchMore = () => {
    if (!result.data?.repositories.pageInfo.hasNextPage) return
    result.fetchMore({ variables: { after: result.data.repositories.pageInfo.endCursor } })
  }
  return { ...result, repositories: result.data?.repositories, fetchMore: handleFetchMore }
}
