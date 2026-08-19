import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
export default [{ ignores: ['dist'] }, js.configs.recommended, { files: ['src/**/*.{js,jsx}'], languageOptions: { globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } } }, plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh }, rules: { ...reactHooks.configs.recommended.rules, ...reactRefresh.configs.vite.rules, 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z]' }], 'react-refresh/only-export-components': 'off' } }]
