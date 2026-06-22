'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore } from '@/store/useStore';
import { dict } from '@/lib/i18n';
import { puzzleSequence } from '@/lib/puzzles';
import { Fingerprint, Heart, ShieldAlert, Skull, Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const router = useRouter();
  const { 
    language, isAuthenticated, characterProfile, 
    currentPuzzleIndex, attemptsLeft, isGameOver, 
    submitAnswer, resetGame 
  } = useGameStore();
  const d = dict[language];
  
  const [mounted, setMounted] = useState(false);
  const [answerInput, setAnswerInput] = useState('');
  const [showError, setShowError] = useState(false);

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

  // --- GAME OVER STATE ---
  if (isGameOver) {
    return (
      <main className="min-h-screen bg-black text-red-600 flex flex-col items-center justify-center p-6 text-center">
        <Skull size={100} className="mb-8 animate-pulse text-red-700" />
        <h1 className="text-5xl font-bold mb-4 font-mono text-glitch">YOU ARE TRAPPED FOREVER</h1>
        <p className="text-xl text-red-900 mb-12">The Sadat Family curse has consumed you. 0 Attempts Left.</p>
        <button 
          onClick={() => { resetGame(); router.push('/login'); }}
          className="border border-red-800 text-red-800 px-8 py-3 hover:bg-red-900 hover:text-black transition-colors"
        >
          RESTART PROTOCOL
        </button>
      </main>
    );
  }

  // --- VICTORY STATE ---
  if (currentPuzzleIndex >= puzzleSequence.length) {
    return (
      <main className="min-h-screen bg-midnight text-neon-green flex flex-col items-center justify-center p-6 text-center">
        <Trophy size={100} className="mb-8 animate-bounce text-amber-gold" />
        <h1 className="text-5xl font-bold mb-4 font-mono">CURSE BROKEN</h1>
        <p className="text-xl text-gray-400 mb-12">You have survived the night and freed the spirit of the child.</p>
        <button 
          onClick={() => { resetGame(); router.push('/'); }}
          className="bg-neon-green text-midnight px-8 py-3 font-bold hover:bg-white transition-colors"
        >
          ESCAPE
        </button>
      </main>
    );
  }

  // --- ACTIVE PUZZLE STATE ---
  const currentPuzzle = puzzleSequence[currentPuzzleIndex];
  const puzzleTitle = language === 'ar' ? currentPuzzle.titleAr : currentPuzzle.titleEn;
  const puzzleDesc = language === 'ar' ? currentPuzzle.descAr : currentPuzzle.descEn;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPuzzle.expectedAnswer) {
      submitAnswer(true);
      return;
    }

    if (answerInput.trim().toLowerCase() === currentPuzzle.expectedAnswer.toLowerCase()) {
      submitAnswer(true);
      setAnswerInput('');
      setShowError(false);
    } else {
      submitAnswer(false);
      setAnswerInput('');
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-midnight text-foreground flex flex-col pb-20">
      <Navbar />
      
      <div className="flex-1 w-full max-w-lg mx-auto px-4 mt-20 md:mt-24 flex flex-col gap-6">
        
        {/* Simplified Character Header for Mobile */}
        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 bg-gradient-to-r from-black to-electric-blue/10 border border-white/10">
          <Fingerprint className="text-electric-blue w-8 h-8 flex-shrink-0" />
          <div className="overflow-hidden">
            <h2 className="text-[10px] text-electric-blue tracking-widest uppercase truncate">AGENT LOGGED IN</h2>
            <h1 className="text-lg font-bold text-white uppercase truncate">
              {language === 'ar' ? characterProfile.nameAr : characterProfile.name}
            </h1>
          </div>
        </div>

        {/* Puzzle Container */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPuzzle.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex justify-between items-end mb-4 px-2">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                STAGE {currentPuzzleIndex + 1} / {puzzleSequence.length}
              </span>
              <div className="flex gap-1 text-red-500">
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} size={16} fill={i < attemptsLeft ? "currentColor" : "none"} className={i >= attemptsLeft ? "text-gray-700" : ""} />
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex-1 flex flex-col">
              <h2 className="text-2xl font-bold text-amber-gold mb-4 text-center">
                {puzzleTitle}
              </h2>
              
              {puzzleDesc && (
                <p className="text-gray-300 text-center mb-6 leading-relaxed">
                  {puzzleDesc}
                </p>
              )}

              {currentPuzzle.mediaUrl && (
                <div className="w-full mb-6 rounded-lg overflow-hidden border border-white/5 bg-black/50 aspect-video relative">
                  {currentPuzzle.mediaType === 'image' && (
                    <img src={currentPuzzle.mediaUrl} alt="clue" className="w-full h-full object-cover" />
                  )}
                  {currentPuzzle.mediaType === 'video' && (
                    <video src={currentPuzzle.mediaUrl} controls className="w-full h-full object-contain" />
                  )}
                  {currentPuzzle.mediaType === 'map' && (
                    <div className="w-full h-full flex items-center justify-center text-electric-blue font-mono text-xs">
                      [MAP MODULE LINKED]
                    </div>
                  )}
                </div>
              )}

              <div className="mt-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {currentPuzzle.expectedAnswer && (
                    <input 
                      type="text" 
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      placeholder="Enter Solution..."
                      className={`w-full bg-black/80 border ${showError ? 'border-red-500 ring-1 ring-red-500' : 'border-white/20'} rounded-lg p-4 text-white text-center focus:outline-none focus:border-neon-green transition-all`}
                      required
                    />
                  )}
                  
                  <button 
                    type="submit"
                    className="w-full bg-neon-green text-midnight font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-white transition-colors"
                  >
                    {currentPuzzle.expectedAnswer ? 'SUBMIT' : 'CONTINUE'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </main>
  );
}
