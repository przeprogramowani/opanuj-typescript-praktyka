import { type FeatureFlags } from './legacy-flags.ts';

type FlagsV2<T> = {};

export type ModernFeatureFlags = FlagsV2<FeatureFlags>;

export function getFeatureFlagsV2(flags: FeatureFlags): ModernFeatureFlags {
  const flagsV2: ModernFeatureFlags = {};

  return flagsV2;
}
