import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Extended local window', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should use local declaration to extend window', () => {
    const fileContent = readFileSync(join(__dirname, 'task.ts'), 'utf8');
    const expectedOperator = Buffer.from('6465636c61726520636f6e73742077696e646f77', 'hex')
      .toString()
      .trim(); // encoded operator(s) to prevent spoiler

    try {
      expect(fileContent.includes(expectedOperator)).toBe(true);
    } catch {
      throw new Error('File should contain proper local declaration to extend window');
    }
  });

  it('should not use global declaration to extend window', () => {
    const files = readdirSync(__dirname);
    const declarationFiles = files.filter((file) => file.endsWith('.d.ts'));

    if (declarationFiles.length > 0) {
      throw new Error('You should not use global declaration to extend window in this task');
    }

    const taskContent = readFileSync(join(__dirname, 'task.ts'), 'utf8');
    const expectedOperator = Buffer.from('6465636c61726520676c6f62616c', 'hex').toString().trim(); // encoded operator(s) to prevent spoiler

    try {
      expect(taskContent.includes(expectedOperator)).toBe(false);
    } catch {
      throw new Error('You should not use global declaration to extend window in this task');
    }
  });
});
