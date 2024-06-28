// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

const elsintMoreConfig = [
  { files: ["src/**/*.{tsx, ts}"] },
  {ignores: ["node_modules", "build", "**/*.config.js", "**/*.config.ts"]}
]

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...elsintMoreConfig
);