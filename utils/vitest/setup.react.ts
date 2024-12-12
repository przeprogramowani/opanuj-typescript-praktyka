import '@testing-library/jest-dom';
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import { toConfirmCompilation } from './helpers.ts';

expect.extend({
  toConfirmCompilation,
});

afterEach(() => {
  cleanup();
});
