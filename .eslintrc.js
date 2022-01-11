module.exports = {
  extends: [
    'eslint:recommended',
    'react-app',
    'plugin:import/errors',
    'plugin:import/typescript',
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {},
    },
  ],
  rules: {
    semi: ['warn', 'always'],
    quotes: ['warn', 'single'],
    'no-var': 'error',
    curly: 'warn',
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'arrow-parens': ['warn', 'always'],
    'prefer-destructuring': [
      'warn',
      { array: true, object: true },
      { enforceForRenamedProperties: false },
    ],
    'prefer-const': ['warn', { destructuring: 'all' }],
    'prefer-template': 'warn',
    'prefer-spread': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-arrow-callback': 'warn',
    'no-multi-spaces': 'warn',
    'no-useless-return': 'warn',
    'no-trailing-spaces': 'warn',
    'no-console': 'warn',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-unneeded-ternary': 'warn',
    '@typescript-eslint/indent': ['warn', 2, { SwitchCase: 1 }],
    'import/no-absolute-path': 'error',
    'import/no-useless-path-segments': ['warn', { noUselessIndex: true }],
    'import/no-deprecated': 'warn',
    'import/no-unresolved': 'off',
    'import/first': 'error',
    'import/extensions': ['warn', 'never'],
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'import/newline-after-import': 'warn',
    'import/no-anonymous-default-export': [
      'error',
      {
        allowCallExpression: true,
        allowObject: true,
      },
    ],
    'max-len': [
      'warn',
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'eol-last': ['warn', 'always'],
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1, maxBOF: 0 }],
    'lines-between-class-members': ['warn', 'always'],
    'lines-around-directive': ['warn', { before: 'never', after: 'always' }],
    'padded-blocks': ['warn', 'never'],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: ['block', 'block-like'], next: '*' },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
