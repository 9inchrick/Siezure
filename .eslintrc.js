// Converted ESLint config to .eslintrc.js for compatibility with pre-commit hooks and older ESLint CLI.
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    // Add custom rules here if needed
  }
};
