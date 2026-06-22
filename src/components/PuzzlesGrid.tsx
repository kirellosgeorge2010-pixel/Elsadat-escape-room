'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useStore';
import { dict } from '@/lib/i18n';
import { FileText, Video, KeyRound } from 'lucide-react';

export default function PuzzlesGrid() {
  const { language } = useGameStore();
  const d = dict[language];

  const puzzles = [
    {
      id: 1,
      title: d.puzzle1,
      icon: <FileText size={40} className="text-amber-gold mb-4" />,
      delay: 0.1,
    },
    {
      id: 2,
      title: d.puzzle2,
      icon: <Video size={40} className="text-electric-blue mb-4" />,
      delay: 0.2,
    },
    {
      id: 3,
      title: d.puzzle3,
      icon: <KeyRound size={40} className="text-neon-green mb-4" />,
      delay: 0.3,
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-black/80">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
          {d.puzzlesTitle}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {puzzles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: p.delay, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-xl border border-white/5 hover:border-white/20 transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-200">{p.title}</h3>
              <div className="mt-4 w-12 h-1 bg-white/10 group-hover:bg-amber-gold transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
