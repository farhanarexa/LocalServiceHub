'use client';

import { useTheme } from '@/context/ThemeContext';
import { useEffect } from 'react';

export default function RootLayoutClient({ children }) {
  const { theme } = useTheme();

  // Apply theme class to html element when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}