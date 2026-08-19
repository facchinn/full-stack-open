import { StyleSheet, TextInput, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
export default function FormField({ label, error, ...props }) {
  return <View style={styles.wrapper}><Text color="secondary" style={styles.label}>{label}</Text><TextInput style={[styles.input, error && styles.errorInput]} placeholderTextColor="#9aa3b2" {...props} />{error && <Text style={styles.error}>{error}</Text>}</View>
}
const styles = StyleSheet.create({ wrapper: { marginBottom: 14 }, label: { marginBottom: 7, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }, input: { backgroundColor: '#fff', borderWidth: 1, borderColor: theme.colors.line, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 }, errorInput: { borderColor: theme.colors.danger }, error: { color: theme.colors.danger, fontSize: 12, marginTop: 5 } })
