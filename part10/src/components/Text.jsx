import { Text as NativeText, StyleSheet } from 'react-native'
import theme from '../theme'
export default function Text({ color, fontSize, fontWeight, style, ...props }) {
  const textStyle = [styles.text, color === 'secondary' && styles.secondary, fontSize === 'subheading' && styles.subheading, fontWeight === 'bold' && styles.bold, style]
  return <NativeText style={textStyle} {...props} />
}
const styles = StyleSheet.create({ text: { color: theme.colors.textPrimary, fontSize: theme.fontSizes.body, fontFamily: theme.fonts.main }, secondary: { color: theme.colors.textSecondary }, subheading: { fontSize: theme.fontSizes.subheading }, bold: { fontWeight: theme.fontWeights.bold } })
