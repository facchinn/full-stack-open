import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { NativeRouter, Route, Routes } from 'react-router-native'
import apolloClient from './src/apolloClient'
import AppBar from './src/components/AppBar'
import RepositoryList from './src/components/RepositoryList'
import RepositoryView from './src/components/RepositoryView'
import SignIn from './src/components/SignIn'
import ReviewForm from './src/components/ReviewForm'
import MyReviews from './src/components/MyReviews'
import theme from './src/theme'

function Main() {
  return <View style={styles.container}><AppBar /><Routes><Route path="/" element={<RepositoryList />} /><Route path="/signin" element={<SignIn />} /><Route path="/review" element={<ReviewForm />} /><Route path="/my-reviews" element={<MyReviews />} /><Route path="/repository/:id" element={<RepositoryView />} /></Routes><StatusBar style="light" /></View>
}
export default function App() { return <ApolloProvider client={apolloClient}><NativeRouter><Main /></NativeRouter></ApolloProvider> }
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: theme.colors.background } })
