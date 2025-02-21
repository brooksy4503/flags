'use client';

import { useFlags } from '../context/FlagsContext';
import { NewHeader } from '../components/NewHeader';
import { useEffect, useState } from 'react';

export default function Home() {
  const { flags, setFlag, isEnabled } = useFlags();
  const [isMounted, setIsMounted] = useState(false);

  // Effect to handle mounting state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to handle dark mode
  useEffect(() => {
    if (!isMounted) return;
    
    const root = document.documentElement;
    const isDark = isEnabled('enableDarkMode');
    
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Cleanup function to ensure dark mode is removed when component unmounts
    return () => {
      root.classList.remove('dark');
    };
  }, [flags.enableDarkMode, isMounted]); // Watch the actual flag value and mounting state

  // Don't render content until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <>
      {isEnabled('showNewHeader') && <NewHeader />}
      <main className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${isEnabled('showNewHeader') ? 'pt-20' : ''}`}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isEnabled('showNewHeader') ? 'py-8' : 'py-12'}`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-8 leading-normal py-1">
              Feature Flags Demo
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Toggle features on and off with ease using our feature flag system
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Feature Flags Cards Column */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Feature Flags</h2>
              {Object.entries(flags).map(([key, value]) => (
                <div 
                  key={key} 
                  className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {key}
                        </h2>
                        <div className="flex items-center mt-1 space-x-2">
                          <div className={`h-2 w-2 rounded-full ${value ? 'bg-green-500' : 'bg-red-500'}`} />
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {value ? 'Enabled' : 'Disabled'}
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={value}
                          onChange={(e) => setFlag(key as keyof typeof flags, e.target.checked)}
                        />
                        <div className="w-14 h-7 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className={`h-1 w-full bottom-0 ${value ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                </div>
              ))}
            </div>

            {/* Feature Previews Column */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Feature Previews</h2>
              
              {isEnabled('enableDarkMode') && (
                <div className="transform transition-all duration-200 hover:scale-[1.02]">
                  <div className="p-6 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg border border-gray-700">
                    <h3 className="text-2xl font-bold text-white mb-2">Dark Mode Experience</h3>
                    <p className="text-gray-300">Experience the sleek and modern dark mode interface, perfect for low-light environments.</p>
                  </div>
                </div>
              )}

              {isEnabled('betaFeatures') && (
                <div className="transform transition-all duration-200 hover:scale-[1.02]">
                  <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl shadow-lg border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 text-xs font-medium bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full">BETA</span>
                      <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Experimental Features</h3>
                    </div>
                    <p className="text-amber-800 dark:text-amber-200">Get early access to upcoming features and help shape the future of our platform.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
