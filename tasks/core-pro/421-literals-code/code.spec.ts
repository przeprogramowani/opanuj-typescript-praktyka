import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { codeToDecimal } from './task.ts';

describe('Binary Literals', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'code-pass.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should not compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'code-fail.ts'));
    expect(diagnostics).not.toConfirmCompilation();
  });

  it('should decode binary to decimal', () => {
    expect(codeToDecimal('110-111-001')).toBe('671');
    expect(codeToDecimal('000-000-101')).toBe('005');
    expect(codeToDecimal('011-100-101')).toBe('345');
  });
});
