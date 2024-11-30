import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { terrainScanResults } from './task-pass.ts';

describe('Inferred Radar', () => {
  it('should compile when type is implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should compile when code is implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task-pass.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should return the reward', () => {
    const result = terrainScanResults();

    expect(result).toEqual(['100$', '20$', null]);
  });
});
