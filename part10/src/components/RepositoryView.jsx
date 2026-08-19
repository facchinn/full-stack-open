import { FlatList, StyleSheet, View } from 'react-native'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-native'
import { GET_REPOSITORY } from '../graphql'
import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'
import Text from './Text'
import theme from '../theme'
export default function RepositoryView() {
  const { id } = useParams()
  const result = useQuery(GET_REPOSITORY, { variables: { id, first: 5 }, fetchPolicy: 'cache-and-network' })
  const repository = result.data?.repository
  if (!repository) return <Text style={styles.loading}>Loading repository…</Text>
  const reviews = repository.reviews.edges.map((edge) => edge.node)
  const fetchMore = () => repository.reviews.pageInfo.hasNextPage && result.fetchMore({ variables: { after: repository.reviews.pageInfo.endCursor } })
  return <FlatList data={reviews} keyExtractor={(item) => item.id} renderItem={({ item }) => <ReviewItem review={item} />} ListHeaderComponent={<><RepositoryItem repository={repository} showLink /><View style={styles.heading}><Text fontWeight="bold">Reviews</Text></View></>} ItemSeparatorComponent={() => <View style={styles.separator} />} onEndReached={fetchMore} onEndReachedThreshold={0.4} />
}
const styles = StyleSheet.create({ loading: { padding: 20 }, heading: { padding: 16, backgroundColor: theme.colors.background }, separator: { height: 8, backgroundColor: theme.colors.background } })
