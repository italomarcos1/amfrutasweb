module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    __DEV__: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/prefer-default-export': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'react-native/no-raw-text': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'react/no-array-index-key': 'off',
    'no-underscore-dangle': 'off',
    'no-extra-boolean-cast': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    camelcase: 'off',
    'no-useless-escape': 'off',
    'no-return-assign': 'off',
    'no-console': 'warn',
    'react/state-in-constructor': 'off',
    'react/no-did-update-set-state': 'off',
    'consistent-return': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'warn',
    'no-nested-ternary': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
