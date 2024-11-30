import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { LEGACY_FEATURE_FLAGS } from './legacy-flags.ts';
import { getFeatureFlagsV2 } from './task.ts';

describe('Inferred Flags V2', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should return the flags from v2 app version', () => {
    const flags = getFeatureFlagsV2(LEGACY_FEATURE_FLAGS);
    expect(flags).toEqual({
      isSearchEnabled: false,
      isContactFormEnabled: true,
      isCartEnabled: true,
    });
  });

  it('should not return flags that are not in the v2 app version', () => {
    const flags = getFeatureFlagsV2(LEGACY_FEATURE_FLAGS);
    expect(flags).not.toHaveProperty('isChatEnabled');
  });
});
