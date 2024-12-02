import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Key loop', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should use proper operator(s) to get type details', async () => {
    const fileContent = await fsPromises.readFile(join(__dirname, 'task.ts'), 'utf8');
    const expectedOperator = Buffer.from('6b65796f662074797065', 'hex').toString().trim(); // encoded operator(s) to prevent spoiler

    try {
      expect(fileContent.includes(expectedOperator)).toBe(true);
    } catch {
      throw new Error('File should contain proper operator(s) to get type details');
    }
  });
});
