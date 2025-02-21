export interface FeatureFlags {
    showNewHeader: boolean;
    enableDarkMode: boolean;
    betaFeatures: boolean;
}

export const defaultFlags: FeatureFlags = {
    showNewHeader: false,
    enableDarkMode: false,
    betaFeatures: false,
};

// Local storage key for persisting flags
export const FLAGS_STORAGE_KEY = 'app_feature_flags'; 