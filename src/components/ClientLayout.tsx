'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useStore';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { language } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  // To prevent hydration mismatch, we don't render until mounted, 
  // or we just render children normally and only apply dir to HTML element.
  // We'll just render children. The dir is applied to documentElement.

  return (
    <div className={`flex min-h-screen flex-col bg-midnight text-foreground ${language === 'ar' ? 'font-arabic' : 'font-english'}`}>
      {children}
    </div>
  );
}
