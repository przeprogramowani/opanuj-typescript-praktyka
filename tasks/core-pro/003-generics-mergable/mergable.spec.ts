import { describe, it, expect } from 'vitest';
import { getDiagnostics } from '../../../utils/ts-utils.ts';

import { join } from 'path';

describe('MergableObject type', () => {
  it('should allow merging objects', () => {
    const diagnostics = getDiagnostics(join(__dirname, 'mergable-pass.ts'));
    expect(diagnostics).to.be.empty;
  });

  it('should disallow merging non-objects', () => {
    const diagnostics = getDiagnostics(join(__dirname, 'mergable-fail.ts'));
    expect(diagnostics).to.not.be.empty;
    console.log(diagnostics);
  });
});
