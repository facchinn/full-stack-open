import { Pressable, StyleSheet, View } from 'react-native'
import Text from './Text'
import { formatDate } from '../utils/format'
import theme from '../theme'
export default function ReviewItem({ review, actions }) {
  return <View style={styles.container}><View style={styles.rating}><Text fontWeight="bold" style={styles.ratingText}>{review.rating}</Text></View><View style={styles.content}><Text fontWeight="bold">{review.repository?.fullName || review.user?.username}</Text><Text color="secondary" style={styles.date}>{formatDate(review.createdAt)}</Text><Text style={styles.body}>{review.text}</Text>{actions && <View style={styles.actions}>{actions.map((action) => <Pressable key={action.label} onPress={action.onPress} style={[styles.button, action.danger && styles.danger]}><Text style={styles.buttonText} fontWeight="bold">{action.label}</Text></Pressable>)}</View>}</View></View>
}
const styles = StyleSheet.create({ container: { flexDirection: 'row', backgroundColor: 'white', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.line }, rating: { width: 46, height: 46, borderRadius: 23, borderWidth: 2, borderColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' }, ratingText: { color: theme.colors.primary }, content: { flex: 1, marginLeft: 14 }, date: { marginTop: 3 }, body: { marginTop: 10, lineHeight: 20 }, actions: { flexDirection: 'row', gap: 8, marginTop: 12 }, button: { backgroundColor: theme.colors.primary, borderRadius: 6, padding: 9 }, danger: { backgroundColor: theme.colors.danger }, buttonText: { color: 'white', fontSize: 12 } })
