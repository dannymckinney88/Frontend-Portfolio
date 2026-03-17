import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier, // disables ESLint rules that conflict with Prettier
    ],

    plugins: {
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      /**
       * Import Sorting
       */
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // external
            ['^react', '^@?\\w'],
            // internal aliases
            ['^@/'],
            // relative imports
            ['^\\.'],
            // types
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',

      /**
       * Unused Imports / Vars
       */
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      /**
       * React
       */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /**
       * General Cleanup
       */
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]);
