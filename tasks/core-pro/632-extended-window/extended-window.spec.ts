import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Extended global window', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();

    const diagnosticsTracking = getCompilerDiagnostics(join(__dirname, 'tracking-code.ts'));
    expect(diagnosticsTracking).toConfirmCompilation();
  });

  it('should use global declaration in a dedicated file to extend window', () => {
    const files = readdirSync(__dirname);
    const declarationFiles = files.filter((file) => file.endsWith('.d.ts'));

    if (declarationFiles.length === 0) {
      throw new Error(
        'You should use global declaration in a dedicated file to extend window in this task',
      );
    }

    try {
      let hasGlobalDeclaration = declarationFiles.some((file) => {
        const fileContent = readFileSync(join(__dirname, file), 'utf8');
        const expectedOperator = Buffer.from('6465636c61726520676c6f62616c', 'hex')
          .toString()
          .trim(); // encoded operator(s) to prevent spoiler

        return fileContent.includes(expectedOperator);
      });

      expect(hasGlobalDeclaration).toBe(true);
    } catch {
      throw new Error(
        'You should use global declaration in a dedicated file to extend window in this task',
      );
    }
  });

  it('should not use local declaration to extend window', () => {
    const taskContent = readFileSync(join(__dirname, 'task.ts'), 'utf8');
    const expectedOperator = Buffer.from('6465636c61726520636f6e73742077696e646f77', 'hex')
      .toString()
      .trim(); // encoded operator(s) to prevent spoiler

    try {
      expect(taskContent.includes(expectedOperator)).toBe(false);
    } catch {
      throw new Error('You should not use local declaration to extend window in this task');
    }
  });
});
