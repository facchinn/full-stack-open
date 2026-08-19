import { Formik } from 'formik'
import * as yup from 'yup'
import { Pressable, StyleSheet, View } from 'react-native'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import { CREATE_REVIEW } from '../graphql'
import FormField from './FormField'
import Text from './Text'
import theme from '../theme'
const schema = yup.object({ ownerName: yup.string().required(), repositoryName: yup.string().required(), rating: yup.number().integer().min(0).max(100).required(), text: yup.string() })
export default function ReviewForm() {
  const [createReview] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()
  const submit = async (values, { setStatus }) => { try { const response = await createReview({ variables: { review: { ...values, rating: Number(values.rating) } } }); navigate(`/repository/${response.data.createReview.repositoryId}`) } catch (error) { setStatus(error.message) } }
  return <Formik initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }} validationSchema={schema} onSubmit={submit}>{({ handleSubmit, handleChange, handleBlur, values, touched, errors, status }) => <View style={styles.form}><Text style={styles.title} fontWeight="bold">Review a repository</Text><FormField label="Repository owner" value={values.ownerName} onChangeText={handleChange('ownerName')} onBlur={handleBlur('ownerName')} error={touched.ownerName && errors.ownerName} autoCapitalize="none" /><FormField label="Repository name" value={values.repositoryName} onChangeText={handleChange('repositoryName')} onBlur={handleBlur('repositoryName')} error={touched.repositoryName && errors.repositoryName} autoCapitalize="none" /><FormField label="Rating (0–100)" value={values.rating} onChangeText={handleChange('rating')} onBlur={handleBlur('rating')} error={touched.rating && errors.rating} keyboardType="numeric" /><FormField label="Review" value={values.text} onChangeText={handleChange('text')} multiline />{status && <Text style={styles.error}>{status}</Text>}<Pressable style={styles.button} onPress={handleSubmit}><Text style={styles.buttonText} fontWeight="bold">Create review</Text></Pressable></View>}</Formik>
}
const styles = StyleSheet.create({ form: { backgroundColor: 'white', padding: 20, margin: 14, borderRadius: 10 }, title: { fontSize: 25, marginBottom: 22 }, button: { backgroundColor: theme.colors.primary, alignItems: 'center', borderRadius: 8, padding: 14 }, buttonText: { color: 'white' }, error: { color: theme.colors.danger, marginBottom: 10 } })
