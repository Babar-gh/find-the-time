module.exports = {
  plugins: ['stylelint-scss'],
  extends: 'stylelint-config-standard-scss',
  rules: {
    indentation: 2,
    'property-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'no-descending-specificity': null,
    'string-quotes': 'single',
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'max-line-length': [80, { ignore: ['comments'] }],
    'keyframes-name-pattern': '^[a-zA-Z][a-zA-Z0-9-_]+$',
    'selector-class-pattern': '^[a-zA-Z][a-zA-Z0-9-_]+$',
    'scss/at-mixin-pattern': '^[a-zA-Z][a-zA-Z0-9-_]+$',
    'scss/dollar-variable-pattern': '^[a-zA-Z][a-zA-Z0-9-_]+$',
  },
};
