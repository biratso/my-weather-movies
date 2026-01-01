import React, { createContext, useContext } from 'react';
import { APP_VARIANTS, getAppVariant } from '@/config/env';

interface ThemeContextType {
  variant: 'green' | 'orange';
  primaryColor: string;
  appName: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const variant = getAppVariant();
  const config = APP_VARIANTS[variant];

  return (
    <ThemeContext.Provider
      value={{
        variant,
        primaryColor: config.primaryColor,
        appName: config.name,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
