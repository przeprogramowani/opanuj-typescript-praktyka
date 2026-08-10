import { afterAll, expect } from 'vitest';
import { toConfirmCompilation, trackVerify } from './helpers.ts';

expect.extend({
  toConfirmCompilation,
});

afterAll(({}, suite) => {
  trackVerify('core', suite);
});
