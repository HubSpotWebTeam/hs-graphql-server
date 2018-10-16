module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 6,
  },
  plugins: ['import'],

  rules: {
    'comma-dangle': 1,
    'no-param-reassign': [1, { props: false }],
    'arrow-parens': 0,
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'no-plusplus': 0,
    'no-console': 0,
    'no-confusing-arrow': 0,
    'import/no-extraneous-dependencies': 0,
    'react/require-extension': 'off',
    'react/prefer-stateless-function': 'off',
    'no-trailing-spaces': [2, { skipBlankLines: true }],
    'react/forbid-prop-types': 0,
    'no-unused-expressions': [1, { allowTernary: true }],
    'max-len': [
      2,
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
  },
};
