import AsyncStorage from '@react-native-async-storage/async-storage'
const key = 'rateRepositoryApp:accessToken'
export default class AuthStorage {
  getAccessToken() { return AsyncStorage.getItem(key) }
  setAccessToken(token) { return AsyncStorage.setItem(key, token) }
  removeAccessToken() { return AsyncStorage.removeItem(key) }
}
