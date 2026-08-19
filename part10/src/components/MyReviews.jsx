import { Alert, FlatList, StyleSheet, View } from 'react-native'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import { DELETE_REVIEW, ME } from '../graphql'
import ReviewItem from './ReviewItem'
import Text from './Text'
import theme from '../theme'
export default function MyReviews() {
  const { data, refetch } = useQuery(ME, { variables: { includeReviews: true }, fetchPolicy: 'cache-and-network' })
  const [deleteReview] = useMutation(DELETE_REVIEW)
  const navigate = useNavigate()
  const remove = (id) => Alert.alert('Delete review', 'This action cannot be undone.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: async () => { await deleteReview({ variables: { id } }); refetch() } }])
  const reviews = data?.me?.reviews.edges.map((edge) => edge.node) || []
  return <FlatList data={reviews} keyExtractor={(item) => item.id} ListHeaderComponent={<View style={styles.heading}><Text style={styles.title} fontWeight="bold">My reviews</Text></View>} renderItem={({ item }) => <ReviewItem review={item} actions={[{ label: 'View repository', onPress: () => navigate(`/repository/${item.repository.id}`) }, { label: 'Delete review', danger: true, onPress: () => remove(item.id) }]} />} ItemSeparatorComponent={() => <View style={styles.separator} />} />
}
const styles = StyleSheet.create({ heading: { padding: 18, backgroundColor: theme.colors.background }, title: { fontSize: 24 }, separator: { height: 8, backgroundColor: theme.colors.background } })
