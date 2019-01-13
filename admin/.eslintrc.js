module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  rules: {
    'func-names': ['error', 'never'],
    'jsx-a11y/label-has-for': false,
    'jsx-a11y/anchor-is-valid': false,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-console': ["error", { allow: ["warn", "error"] }],
    'react/prefer-stateless-function': [0],
    'import/prefer-default-export': [0],
    'import/extensions': 'always',
    'jsx-a11y/label-has-associated-control': [0],
  },
  globals: {
    window: true,
    document: true,
    history: true,
    location: true,
    FormData: true,
    Headers: true,
    Image: true,
    navigator: true,
    __dirname: true,
    __DEV__: true,
    CONFIG: true,
    process: true,
    jest: true,
    describe: true,
    test: true,
    it: true,
    expect: true,
    beforeEach: true,
    fetch: true,
    alert: true,
  },
};
