module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'react-app',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    // "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'import', 'jsx-a11y'],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ], 
    // "prettier/prettier": "error",
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    "import/no-named-as-default": 'off',
    "no-shadow":"warn",
    'max-len': 'off',
    "jsx-a11y/label-has-for": [ "error", {
      "required": {
        "some": [ "nesting", "id"  ]
      }
    }],
    "quotes": [2, "single", { "avoidEscape": true }],
    "jsx-a11y/label-has-associated-control": [ "error", {
      "required": {
        "some": [ "nesting", "id"  ]
      }
    }],
    "no-nested-ternary": "off",
    "jsx-a11y/anchor-is-valid":"off",
    "jsx-a11y/click-events-have-key-events": "off"
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};

// module.exports = {
//     extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
//     parser: '@typescript-eslint/parser',
//     plugins: ['@typescript-eslint', 'prettier'],
//     settings: {
//       'import/parsers': {
//         '@typescript-eslint/parser': ['.ts', '.tsx'],
//       },
//       'import/resolver': {
//         typescript: {},
//       },
//     },
//     rules: {
//       'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
//       'import/no-extraneous-dependencies': [2, { devDependencies: ['**/test.tsx', '**/test.ts'] }],
//       '@typescript-eslint/indent': [2, 2],
//     },
//   };