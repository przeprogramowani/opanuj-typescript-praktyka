import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';

describe('Typing training', () => {
  it('should compile provided functions', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });
});
