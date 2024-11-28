import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';

describe('MergableObject type', () => {
  it('should allow merging objects', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'mergable-pass.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should disallow merging non-objects', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'mergable-fail.ts'));
    expect(diagnostics).not.toConfirmCompilation();
  });
});
