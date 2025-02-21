'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FeatureFlags } from '../config/flags';
import { flagsService } from '../services/flagsService';

interface FlagsContextType {
  flags: FeatureFlags;
  setFlag: (key: keyof FeatureFlags, value: boolean) => void;
  isEnabled: (key: keyof FeatureFlags) => boolean;
}

const FlagsContext = createContext<FlagsContextType | undefined>(undefined);

export function FlagsProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(flagsService.getFlags());

  const updateFlag = (key: keyof FeatureFlags, value: boolean) => {
    flagsService.setFlag(key, value);
    setFlags(flagsService.getFlags());
  };

  const checkFlag = (key: keyof FeatureFlags): boolean => {
    return flagsService.isEnabled(key);
  };

  return (
    <FlagsContext.Provider
      value={{
        flags,
        setFlag: updateFlag,
        isEnabled: checkFlag,
      }}
    >
      {children}
    </FlagsContext.Provider>
  );
}

export function useFlags() {
  const context = useContext(FlagsContext);
  if (context === undefined) {
    throw new Error('useFlags must be used within a FlagsProvider');
  }
  return context;
} 