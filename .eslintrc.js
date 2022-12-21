module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ]
  }
}
