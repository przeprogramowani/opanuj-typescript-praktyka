import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './utils/vitest/setup.ts',
    environment: 'node',
    typecheck: {
      tsconfig: './tsconfig.json',
    },
  },
});
