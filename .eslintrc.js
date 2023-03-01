module.exports = {
  env: {
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  extends: ['prettier', 'plugin:prettier/recommended', 'plugin:jest/recommended'],
  rules: {
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    'no-empty': 'warn',
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
};
