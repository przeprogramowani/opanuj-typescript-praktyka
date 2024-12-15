import { join } from 'path';
import { describe, test, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils';

describe('Form Controls', () => {
  test('should compile', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'App.tsx'));
    expect(diagnostics).toConfirmCompilation();
  });
});
