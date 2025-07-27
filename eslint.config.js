
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginJSXA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginTS from '@typescript-eslint/eslint-plugin';
import parserTS from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTS,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': eslintPluginTS,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJSXA11y
    },

    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
    }
  }
];
