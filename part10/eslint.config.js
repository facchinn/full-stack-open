import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
export default [js.configs.recommended, { files: ['App.js', 'src/**/*.{js,jsx}'], languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaFeatures: { jsx: true } } }, plugins: { react, 'react-hooks': reactHooks }, settings: { react: { version: 'detect' } }, rules: { ...reactHooks.configs.recommended.rules, 'react/prop-types': 'off', 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z]' }] } }]
