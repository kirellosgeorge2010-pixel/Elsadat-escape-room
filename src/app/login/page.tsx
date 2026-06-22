'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/useStore';
import { dict } from '@/lib/i18n';
import { characters } from '@/lib/mockCharacters';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  
  const { language, login } = useGameStore();
  const d = dict[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const character = characters.find(
      c => c.username === usernameInput && c.password === passwordInput
    );

    if (character) {
      login(usernameInput, character);
      router.push('/profile');
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-midnight text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 mt-16">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-8 md:p-12 rounded-2xl w-full max-w-md relative overflow-hidden"
        >
          {/* Decorative neon line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green via-electric-blue to-amber-gold"></div>

          <div className="text-center mb-8">
            <Lock size={48} className="mx-auto text-electric-blue mb-4" />
            <h1 className="text-3xl font-bold text-white tracking-widest uppercase">{d.login}</h1>
            <p className="text-gray-400 mt-2 text-sm">SECURE ACCESS PORTAL</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                {d.username}
              </label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                {d.password}
              </label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-md p-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center animate-pulse">ACCESS DENIED.</p>
            )}

            <button 
              type="submit"
              className="w-full bg-electric-blue text-midnight font-bold py-3 rounded-md uppercase tracking-widest hover:bg-white hover:shadow-[0_0_15px_rgba(8,247,254,0.6)] transition-all"
            >
              {d.enterCode}
            </button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
