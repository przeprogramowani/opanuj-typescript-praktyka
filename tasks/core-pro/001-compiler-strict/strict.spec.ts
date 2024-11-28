import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';

describe('Strict mode', () => {
  it('should compile when strict mode is enabled', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'user-management.ts'));
    expect(diagnostics).toConfirmCompilation();
  });
});
