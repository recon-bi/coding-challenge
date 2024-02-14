module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    // Tells eslint how to resolve imports
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        paths: './tsconfig.json',
      },
    },
  },

  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
