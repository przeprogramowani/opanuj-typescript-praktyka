import { afterAll, expect } from 'vitest';
import { toConfirmCompilation } from './helpers.ts';

expect.extend({
  toConfirmCompilation,
});
