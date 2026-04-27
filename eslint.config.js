import js from '@eslint/js';

export default [
  {
    ignores: ['themes/elsi-theme/assets/js/app.js', 'public/**', 'resources/**'],
  },
  js.configs.recommended,
  {
    files: ['webpack.config.js', 'eslint.config.js', '**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'writable',
        exports: 'writable',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      // Add custom rules here
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
];
