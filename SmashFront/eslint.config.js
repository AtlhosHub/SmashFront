import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      js,
      react: pluginReact,
    },
    extends: [
      'js/recommended',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-path-concat': 'error',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]);