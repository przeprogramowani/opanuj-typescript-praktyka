import { describe, it, expect } from 'vitest';
import { getCompilationErrors } from '../../../utils/ts-utils.ts';
import { join } from 'path';

describe('Intro', () => {
  it('should confirm working compilation', () => {
    const diagnostics = getCompilationErrors(join(__dirname, 'hello-world.ts'));
    expect(diagnostics).to.be.empty;
  });
});
