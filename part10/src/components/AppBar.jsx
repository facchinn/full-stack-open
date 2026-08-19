import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { useApolloClient, useQuery } from '@apollo/client'
import Text from './Text'
import { ME } from '../graphql'
import { authStorage } from '../apolloClient'
const Tab = ({ to, children }) => <Link to={to} component={Pressable}><Text style={styles.tab} fontWeight="bold">{children}</Text></Link>
export default function AppBar() {
  const { data } = useQuery(ME)
  const client = useApolloClient()
  const navigate = useNavigate()
  const logout = async () => { await authStorage.removeAccessToken(); await client.resetStore(); navigate('/') }
  return <View style={styles.bar}><Text style={styles.logo} fontWeight="bold">RateRepo</Text><ScrollView horizontal showsHorizontalScrollIndicator={false}><Tab to="/">Repositories</Tab>{data?.me ? <><Tab to="/review">Create review</Tab><Tab to="/my-reviews">My reviews</Tab><Pressable onPress={logout}><Text style={styles.tab} fontWeight="bold">Sign out</Text></Pressable></> : <Tab to="/signin">Sign in</Tab>}</ScrollView></View>
}
const styles = StyleSheet.create({ bar: { backgroundColor: '#111827', paddingTop: 44, paddingHorizontal: 15, paddingBottom: 14, flexDirection: 'row', alignItems: 'center' }, logo: { color: '#8ba0ff', fontSize: 18, marginRight: 20 }, tab: { color: 'white', marginRight: 20, paddingVertical: 7 } })
