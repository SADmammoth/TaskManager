module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    "ecmaFeatures": {
      "jsx": true
  }
  },
  rules: {
    'no-console': 'off',
    'react/prop-types': 0,
    'no-undef': 1,
    'no-unused-vars': 1
  }
};
