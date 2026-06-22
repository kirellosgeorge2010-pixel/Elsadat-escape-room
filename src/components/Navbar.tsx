'use client';

import { useGameStore } from '@/store/useStore';
import { dict, Language } from '@/lib/i18n';
import { Globe, LogOut, Clock, KeySquare } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { language, setLanguage, isAuthenticated, logout, timerStartedAt } = useGameStore();
  const d = dict[language];
  const [mounted, setMounted] = useState(false);
  const [timeText, setTimeText] = useState('12:00 AM');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Timer logic: 12 AM to 3 AM (180 minutes)
  useEffect(() => {
    if (!isAuthenticated || !timerStartedAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - timerStartedAt;
      const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60)); // 1 min real-time = 1 min game-time for now
      // Let's speed it up or map it: 60 real seconds = 1 game minute?
      // For testing, let's just show real elapsed time added to 12:00 AM.
      
      let hours = Math.floor(elapsedMinutes / 60);
      let mins = elapsedMinutes % 60;
      
      if (hours >= 3) {
        setTimeText('03:00 AM');
        clearInterval(interval);
      } else {
        const hStr = hours === 0 ? '12' : `0${hours}`;
        const mStr = mins < 10 ? `0${mins}` : mins;
        setTimeText(`${hStr}:${mStr} AM`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, timerStartedAt]);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel py-4 px-6 md:px-12 flex justify-between items-center border-b border-white/10">
      <Link href="/" className="text-xl md:text-2xl font-bold tracking-widest text-electric-blue flex items-center gap-2">
        <KeySquare className="text-amber-gold" />
        SADAT MYSTERY
      </Link>
      
      <div className="flex items-center gap-6">
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-2 text-neon-green font-mono text-lg animate-pulse">
            <Clock size={20} />
            <span>{timeText}</span>
          </div>
        )}

        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
        >
          <Globe size={18} />
          {language === 'en' ? 'عربي' : 'EN'}
        </button>

        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="flex items-center gap-2 text-sm bg-red-900/50 hover:bg-red-900 text-white px-4 py-2 rounded-md transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">{d.logout}</span>
          </button>
        ) : (
          <Link 
            href="/login"
            className="text-sm bg-electric-blue text-midnight font-bold px-4 py-2 rounded-md hover:bg-white transition-colors"
          >
            {d.login}
          </Link>
        )}
      </div>
    </nav>
  );
}
