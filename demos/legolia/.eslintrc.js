module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:jsx-a11y/recommended', 'next'],
  plugins: ['prettier', 'sort-imports-es6-autofix', 'sort-exports'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  rules: {
    // ESLint
    'arrow-body-style': [2, 'as-needed'],
    'arrow-parens': [2, 'as-needed'],
    camelcase: [
      2,
      {
        properties: 'always',
      },
    ],
    'max-lines': 2,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../'],
            message:
              'Relative imports from parent directories are not allowed, use absolute paths instead.',
          },
        ],
      },
    ],
    'no-shadow': 0,
    'no-use-before-define': 0,
    'no-var': 2,
    'object-shorthand': [2, 'always'],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
    'sort-keys': 0,
    'sort-vars': [
      2,
      {
        ignoreCase: false,
      },
    ],
    'import/namespace': [
      2,
      {
        allowComputed: true,
      },
    ],
    // Plugins
    'import/no-anonymous-default-export': [
      2,
      {
        allowObject: true,
      },
    ],
    'import/no-unresolved': 2,
    'sort-exports/sort-exports': [
      'error',
      {
        sortDir: 'asc',
      },
    ],
    'sort-imports-es6-autofix/sort-imports-es6': [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['single', 'multiple', 'all', 'none'],
      },
    ],
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/no-onchange': 0,
    'prettier/prettier': [
      2,
      {
        printWidth: 200,
        singleQuote: true,
        semi: false,
        trailingComma: 'es5',
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
    'react/forbid-component-props': 0,
    'react/forbid-prop-types': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-curly-brace-presence': [
      2,
      {
        props: 'never',
        children: 'ignore',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-handler-names': 0,
    'react/jsx-max-depth': [
      2,
      {
        max: 5,
      },
    ],
    'react/jsx-no-bind': 2,
    'react/jsx-no-literals': 2,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: false,
        shorthandFirst: false,
        shorthandLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: false,
      },
    ],
    'react/no-multi-comp': 0,
    'react/no-set-state': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/require-optimization': 0,
    'react/self-closing-comp': [
      2,
      {
        html: true,
      },
    ],
    'react/sort-prop-types': [
      2,
      {
        callbacksLast: false,
        ignoreCase: true,
        requiredFirst: false,
      },
    ],
    'react-hooks/exhaustive-deps': [
      1,
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    'react-hooks/rules-of-hooks': 2,
  },
}
