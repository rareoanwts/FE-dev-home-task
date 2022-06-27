module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended", "prettier"
  ],
  env: {
    "browser": true,
    "es2021": true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "off"
  }
};
