module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'eslint-plugin-prefer-arrow'],
  rules: {
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: true,
      },
    ],
    'no-implicit-coercion': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-console': 'error',
    //'react/jsx-key': 'error',
    //'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    //'react-hooks/exhaustive-deps': 'error',
    'import/order': [
      'error',
      {
        groups: ['external', 'internal', 'builtin', ['sibling', 'parent'], 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/no-absolute-path': 2,
    'import/no-useless-path-segments': 2,
    'import/newline-after-import': 2,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
