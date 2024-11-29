import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { checkAccess } from './task.ts';

describe('Mapped Types', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should return valid access map', () => {
    const accessMetadata = checkAccess({
      homepage: '/home',
      about: '/about',
      contact: '/contact',
    });

    expect(accessMetadata.homepage).toEqual(true);
  });
});
