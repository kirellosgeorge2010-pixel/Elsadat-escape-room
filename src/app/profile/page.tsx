'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/useStore';
import { dict } from '@/lib/i18n';
import { User, Shield, Wrench, Fingerprint } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';

export default function Profile() {
  const router = useRouter();
  const { language, isAuthenticated, characterProfile } = useGameStore();
  const d = dict[language];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !characterProfile) {
    return (
      <div className="min-h-screen bg-midnight text-white flex items-center justify-center">
        <div className="animate-pulse text-electric-blue">DECRYPTING...</div>
      </div>
    );
  }

  const name = language === 'ar' ? characterProfile.nameAr : characterProfile.name;
  const role = language === 'ar' ? characterProfile.roleAr : characterProfile.role;
  const tools = language === 'ar' ? characterProfile.toolsAr : characterProfile.tools;

  return (
    <main className="min-h-screen bg-midnight text-foreground flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 mt-20 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          {/* Header Card */}
          <div className="glass-panel p-6 rounded-t-xl border-b border-white/10 flex items-center gap-4 bg-gradient-to-r from-black/80 to-electric-blue/10">
            <Fingerprint className="text-electric-blue w-12 h-12" />
            <div>
              <h2 className="text-xs text-electric-blue tracking-widest uppercase mb-1">CLASSIFIED DOSSIER</h2>
              <h1 className="text-2xl md:text-4xl font-bold text-white uppercase">{name}</h1>
            </div>
          </div>

          {/* Body Content */}
          <div className="glass-panel p-6 md:p-10 rounded-b-xl grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Placeholder */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-electric-blue rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative aspect-[3/4] bg-black border border-white/10 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={characterProfile.imageUrl} 
                  alt={name}
                  className="w-full h-full object-cover opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                <div className="absolute bottom-0 w-full p-2 bg-black/80 text-center font-mono text-xs text-neon-green">
                  ID: SADAT-{characterProfile.username.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-6">
              
              <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 text-xs tracking-widest uppercase mb-2">
                  <User size={14} /> {d.profileAge}
                </div>
                <div className="text-2xl text-white font-mono">{characterProfile.age}</div>
              </div>

              <div className="bg-black/40 p-4 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 text-gray-500 text-xs tracking-widest uppercase mb-2">
                  <Shield size={14} /> {d.profileRole}
                </div>
                <div className="text-xl text-amber-gold">{role}</div>
              </div>

              <div className="bg-black/40 p-4 rounded-lg border border-white/5 flex-1">
                <div className="flex items-center gap-2 text-gray-500 text-xs tracking-widest uppercase mb-4">
                  <Wrench size={14} /> {d.profileTools}
                </div>
                <ul className="space-y-3">
                  {tools.map((tool: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-white">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div>
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
