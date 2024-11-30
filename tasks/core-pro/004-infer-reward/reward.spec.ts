import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { type RewardRadar } from './task.ts';

describe('Inferred Radar', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should return the reward', () => {
    type FirstScan = '🌳[🔥]🌳🌳🌲⚡️[100$]⚡️🌳🌳🌳';
    type SecondScan = '🌲🌳⚡️[20$]⚡️🌲🌲🌳🌲[🔥]🌲';
    type ThirdScan = '🌳🌲[❌]🌳🌳[🔥]⚡️🌳🌲';

    const result1: RewardRadar<FirstScan> = '100$';
    const result2: RewardRadar<SecondScan> = '20$';
    const result3: RewardRadar<ThirdScan> = null;
  });
});
