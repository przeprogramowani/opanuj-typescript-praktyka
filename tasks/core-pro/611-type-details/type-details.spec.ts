import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Type details', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should use proper operator to assert type', async () => {
    const fileContent = await fsPromises.readFile(join(__dirname, 'task.ts'), 'utf8');
    const expectedOperator = Buffer.from('736174697366696573', 'hex').toString(); // encoded operator to prevent spoiler
    try {
      expect(fileContent.includes(expectedOperator)).toBe(true);
    } catch {
      throw new Error('File should contain the proper type verification operator');
    }
  });
});
