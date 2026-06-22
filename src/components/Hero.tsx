'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useStore';
import { dict } from '@/lib/i18n';
import Link from 'next/link';

export default function Hero() {
  const { language } = useGameStore();
  const d = dict[language];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background dark gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-midnight/40 via-midnight to-black z-0"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-wider text-white"
            data-text={d.heroHeadline}
          >
            <span className="text-glitch" data-text={d.heroHeadline}>
              {d.heroHeadline}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {d.storyDesc}
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              href="/login" 
              className="inline-block border-2 border-neon-green text-neon-green px-8 py-4 text-lg md:text-xl font-bold uppercase tracking-widest hover:bg-neon-green hover:text-midnight transition-colors shadow-[0_0_15px_rgba(57,255,20,0.5)]"
            >
              {d.bookNow}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Morse Code Easter Egg */}
      <div className="absolute bottom-10 right-10 text-xs text-gray-800 opacity-50 cursor-crosshair hover:text-amber-gold hover:opacity-100 transition-all">
        ... .- -.. .- - / ..-. .- -- .. .-.. -.--
      </div>
    </section>
  );
}
