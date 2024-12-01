import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';

describe('Stable config', () => {
  it('should use proper operator(s) to prevent object mutation', () => {
    const fileContent = readFileSync(join(__dirname, 'task.ts'), 'utf8');
    const expectedOperator = Buffer.from('617320636f6e7374', 'hex').toString(); // encoded operator(s) to prevent spoiler
    try {
      expect(fileContent.includes(expectedOperator)).toBe(true);
    } catch {
      throw new Error('File should contain proper operator(s) to prevent object mutation');
    }
  });
});
