import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { swapBox } from './task.ts';

describe('Generic swap', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should allow me to swap numbers', () => {
    const swapped = swapBox(10, 100);
    expect(swapped).toEqual([100, 10]);
  });

  it('should allow me to swap strings', () => {
    const swapped = swapBox('world', 'hello');
    expect(swapped).toEqual(['hello', 'world']);
  });

  it('should allow me to swap booleans', () => {
    const swapped = swapBox(false, true);
    expect(swapped).toEqual([true, false]);
  });
});
