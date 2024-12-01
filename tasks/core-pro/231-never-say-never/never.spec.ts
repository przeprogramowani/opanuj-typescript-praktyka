import { join } from 'path';
import { describe, expect, it, vi } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { handleEvent } from './task.ts';
describe('Using never check', () => {
  it('should compile with new event', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should log resize event', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    handleEvent({ type: 'resize', width: 1024, height: 768 });
    expect(consoleSpy).toHaveBeenCalledWith('Zmieniono rozmiar na 1024x768');
    consoleSpy.mockRestore();
  });
});
