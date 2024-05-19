import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPrettierRecommended,
);
