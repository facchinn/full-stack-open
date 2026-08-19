import js from '@eslint/js'
import globals from 'globals'

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'test/**/*.js'],
    languageOptions: { globals: { ...globals.node, ...globals.nodeBuiltin } },
    rules: { 'no-console': 'off' },
  },
]
