export type FeatureFlags = {
  isSearchV2Enabled: boolean;
  isNewDesignSystemEnabled: boolean;
  isContactFormV2Enabled: boolean;
  isNewLoginEnabled: boolean;
  isMobileAppEnabled: boolean;
  isOnboardingEnabled: boolean;
  isNewCheckoutEnabled: boolean;
  isChatEnabled: boolean;
  isPaywallV1Enabled: boolean;
  isNotificationSystemEnabled: boolean;
  isCartV2Enabled: boolean;
  isTrustCenterEnabled: boolean;
};

export const LEGACY_FEATURE_FLAGS: FeatureFlags = {
  isSearchV2Enabled: false,
  isNewDesignSystemEnabled: false,
  isContactFormV2Enabled: true,
  isNewLoginEnabled: false,
  isMobileAppEnabled: false,
  isOnboardingEnabled: false,
  isNewCheckoutEnabled: true,
  isChatEnabled: false,
  isPaywallV1Enabled: false,
  isNotificationSystemEnabled: false,
  isCartV2Enabled: true,
  isTrustCenterEnabled: false,
};
