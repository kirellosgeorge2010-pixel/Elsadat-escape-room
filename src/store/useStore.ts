import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'ar';

interface GameState {
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Auth state
  isAuthenticated: boolean;
  username: string | null;
  characterProfile: any | null;
  login: (username: string, profile: any) => void;
  logout: () => void;
  
  // Timer state
  timerStartedAt: number | null;
  startTimer: () => void;

  // Game state
  currentPuzzleIndex: number;
  attemptsLeft: number;
  isGameOver: boolean;
  submitAnswer: (isCorrect: boolean) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      
      isAuthenticated: false,
      username: null,
      characterProfile: null,
      login: (username, profile) => {
        set((state) => {
          const updates: Partial<GameState> = { 
            isAuthenticated: true, 
            username, 
            characterProfile: profile 
          };
          if (!state.timerStartedAt) {
            updates.timerStartedAt = Date.now();
          }
          return updates;
        });
      },
      logout: () => set({ isAuthenticated: false, username: null, characterProfile: null }),
      
      timerStartedAt: null,
      startTimer: () => set({ timerStartedAt: Date.now() }),

      currentPuzzleIndex: 0,
      attemptsLeft: 3,
      isGameOver: false,
      submitAnswer: (isCorrect) => set((state) => {
        if (state.isGameOver) return state;

        if (isCorrect) {
          return { currentPuzzleIndex: state.currentPuzzleIndex + 1, attemptsLeft: 3 }; // Reset attempts on next puzzle
        } else {
          const newAttempts = state.attemptsLeft - 1;
          return {
            attemptsLeft: newAttempts,
            isGameOver: newAttempts <= 0,
          };
        }
      }),
      resetGame: () => set({ currentPuzzleIndex: 0, attemptsLeft: 3, isGameOver: false, timerStartedAt: Date.now() }),
    }),
    {
      name: 'escape-room-storage',
    }
  )
);
