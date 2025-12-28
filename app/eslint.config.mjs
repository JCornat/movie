import globals from 'globals';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

const stylisticDefault = stylistic.configs.customize({
  flat: true,
  arrowParens: true,
  indent: 2,
  quotes: 'single',
  braceStyle: '1tbs',
  semi: true,
});

const memberDelimiterStyleRules = stylisticDefault.rules['@stylistic/member-delimiter-style'][1];

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '.angular/*',
      '.idea/*',
      'www/*',
      'gulpfile.js',
    ],
  },
  {
    files: ['**/*.{ts}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: parserTs,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  ...tseslint.configs.recommended,
  stylisticDefault,
  {
    name: 'overrides',
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-namespace': 'off',
      '@stylistic/member-delimiter-style': [
        'error',
        {
          ...memberDelimiterStyleRules,
          singleline: {
            delimiter: 'comma',
            requireLast: false,
          },
        },
      ],
      '@stylistic/spaced-comment': 'off', // Keep "spaced-comment" at "off", it's too restrictive for /*-----*\ comments
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/return-await': ['error', 'always'],
      '@stylistic/array-bracket-newline': [
        'error',
        {
          multiline: true,
          minItems: 4,
        },
      ],
      '@stylistic/array-element-newline': [
        'error',
        {
          multiline: true,
          minItems: 4,
        },
      ],
      '@stylistic/operator-linebreak': ['error', 'after'],
      '@stylistic/multiline-ternary': ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': 'error',
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: ['function'],
        },
        {
          blankLine: 'always',
          prev: ['block-like', 'multiline-const'],
          next: ['*'],
        },
        {
          blankLine: 'never',
          prev: ['case', 'default'],
          next: ['case', 'default'],
        },
      ],
    },
  },
];
