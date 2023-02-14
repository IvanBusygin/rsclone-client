module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': [1, { allowForLoopAfterthoughts: true }],
    '@typescript-eslint/no-var-requires': 0, // чтоб не ругался на require в webpack.config
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-use-before-define': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }], // для redux: Assignment to property of function parameter 'state'
    eqeqeq: 2,
    'react/function-component-definition': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
};
