'use client';

import { FeatureFlags, defaultFlags, FLAGS_STORAGE_KEY } from '../config/flags';

class FlagsService {
    private flags: FeatureFlags;

    constructor() {
        this.flags = this.loadFlags();
    }

    private loadFlags(): FeatureFlags {
        if (typeof window === 'undefined') {
            return defaultFlags;
        }

        const storedFlags = localStorage.getItem(FLAGS_STORAGE_KEY);
        if (!storedFlags) {
            // Initialize localStorage with default flags
            localStorage.setItem(FLAGS_STORAGE_KEY, JSON.stringify(defaultFlags));
            return defaultFlags;
        }

        try {
            const parsedFlags = JSON.parse(storedFlags);
            // Ensure all default flags exist in parsed flags
            const mergedFlags = { ...defaultFlags, ...parsedFlags };
            return mergedFlags;
        } catch {
            // If parsing fails, reset to default flags
            localStorage.setItem(FLAGS_STORAGE_KEY, JSON.stringify(defaultFlags));
            return defaultFlags;
        }
    }

    getFlags(): FeatureFlags {
        // Always load fresh flags from storage
        this.flags = this.loadFlags();
        return this.flags;
    }

    setFlag(key: keyof FeatureFlags, value: boolean): void {
        const currentFlags = this.loadFlags();
        const updatedFlags = {
            ...currentFlags,
            [key]: value,
        };

        this.flags = updatedFlags;

        if (typeof window !== 'undefined') {
            localStorage.setItem(FLAGS_STORAGE_KEY, JSON.stringify(updatedFlags));
        }
    }

    isEnabled(key: keyof FeatureFlags): boolean {
        // Always check against fresh flags
        return this.loadFlags()[key];
    }
}

export const flagsService = new FlagsService(); 