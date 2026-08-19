import { useState } from 'react'
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import Text from './Text'
import useRepositories from '../hooks/useRepositories'
import theme from '../theme'

const options = [
  { label: 'Latest', orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  { label: 'Highest rated', orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  { label: 'Lowest rated', orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
]
export default function RepositoryList() {
  const [sort, setSort] = useState(options[0])
  const [searchKeyword, setSearchKeyword] = useState('')
  const { repositories, fetchMore } = useRepositories({ orderBy: sort.orderBy, orderDirection: sort.orderDirection, searchKeyword })
  const navigate = useNavigate()
  const header = <View style={styles.header}><TextInput style={styles.search} value={searchKeyword} onChangeText={setSearchKeyword} placeholder="Search repositories" /><View style={styles.sort}>{options.map((option) => <Pressable key={option.label} onPress={() => setSort(option)} style={[styles.chip, sort.label === option.label && styles.active]}><Text style={sort.label === option.label && styles.activeText}>{option.label}</Text></Pressable>)}</View></View>
  return <FlatList data={repositories?.edges.map((edge) => edge.node) || []} keyExtractor={(item) => item.id} renderItem={({ item }) => <RepositoryItem repository={item} onPress={() => navigate(`/repository/${item.id}`)} />} ItemSeparatorComponent={() => <View style={styles.separator} />} ListHeaderComponent={header} onEndReached={fetchMore} onEndReachedThreshold={0.4} />
}
const styles = StyleSheet.create({ header: { padding: 12, backgroundColor: theme.colors.background }, search: { backgroundColor: 'white', borderRadius: 8, padding: 12 }, sort: { flexDirection: 'row', marginTop: 10, gap: 7 }, chip: { borderWidth: 1, borderColor: theme.colors.line, backgroundColor: 'white', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 7 }, active: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }, activeText: { color: 'white' }, separator: { height: 10, backgroundColor: theme.colors.background } })
