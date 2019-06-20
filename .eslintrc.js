module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "settings": {
        "react": {
          "version": "detect"
        }
      },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:cypress/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'indent': [
            'error',
            2
        ],
        'semi': [
            'error',
            'never'
        ],
        'no-console': 0
    }
};