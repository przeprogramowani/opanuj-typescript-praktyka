import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { swap } from './task.ts';

describe('Generic swap', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should allow me to swap numbers', () => {
    const swapped = swap(10, 100);
    expect(swapped).toEqual([100, 10]);
  });

  it('should allow me to swap strings', () => {
    const swapped = swap('world', 'hello');
    expect(swapped).toEqual(['hello', 'world']);
  });
});
