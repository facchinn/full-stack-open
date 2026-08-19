import { Formik } from 'formik'
import * as yup from 'yup'
import { Pressable, StyleSheet, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import FormField from './FormField'
import Text from './Text'
import useSignIn from '../hooks/useSignIn'
import theme from '../theme'

const schema = yup.object({ username: yup.string().required('Username is required'), password: yup.string().required('Password is required') })
export default function SignIn() {
  const [signIn] = useSignIn()
  const navigate = useNavigate()
  const submit = async (values, { setStatus }) => { try { await signIn(values); navigate('/') } catch (error) { setStatus(error.message) } }
  return <Formik initialValues={{ username: '', password: '' }} validationSchema={schema} onSubmit={submit}>{({ handleSubmit, handleChange, handleBlur, values, touched, errors, status }) => <View style={styles.form}><Text style={styles.title} fontWeight="bold">Welcome back</Text><Text color="secondary" style={styles.subtitle}>Sign in to rate repositories and manage your reviews.</Text><FormField label="Username" value={values.username} onChangeText={handleChange('username')} onBlur={handleBlur('username')} error={touched.username && errors.username} autoCapitalize="none" /><FormField label="Password" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} error={touched.password && errors.password} secureTextEntry />{status && <Text style={styles.error}>{status}</Text>}<Pressable style={styles.button} onPress={handleSubmit}><Text style={styles.buttonText} fontWeight="bold">Sign in</Text></Pressable></View>}</Formik>
}
const styles = StyleSheet.create({ form: { backgroundColor: 'white', padding: 20, margin: 14, borderRadius: 10 }, title: { fontSize: 26 }, subtitle: { marginTop: 7, marginBottom: 25, lineHeight: 20 }, button: { backgroundColor: theme.colors.primary, alignItems: 'center', borderRadius: 8, padding: 14 }, buttonText: { color: 'white' }, error: { color: theme.colors.danger, marginBottom: 10 } })
