module.exports = {
  extends: 'algolia',
  parserOptions: {
    ignorePatterns: ['node_modules', 'dist', 'cache'],
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': false,
        'proseWrap': 'never',
        'trailingComma': 'es5',
        'printWidth': 120,
        'arrowParens': 'avoid',
      }
    ],
  },
}
