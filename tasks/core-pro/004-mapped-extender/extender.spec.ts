import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { history } from './task.ts';

describe('Mapped Field Extender', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should extend existing types', () => {
    expect(history.firstName.value).toEqual('John');
    expect(history.firstName.isUpdated).toEqual(false);
    expect(history.lastName.isUpdated).toEqual(true);
  });
});
