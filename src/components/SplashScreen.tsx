import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3200),
      setTimeout(() => onComplete(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, hsl(280, 52%, 15%) 0%, hsl(340, 60%, 20%) 50%, hsl(280, 52%, 10%) 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(280, 52%, 49%, 0.3), transparent)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(340, 60%, 84%, 0.2), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], x: [50, -50, 50], y: [-30, 30, -30] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Floating dry fruit icons */}
        {phase >= 1 && (
          <>
            {['🌰', '🥜', '🫛', '🧠', '🌴', '🍇'].map((emoji, i) => (
              <motion.div
                key={emoji}
                className="absolute text-4xl md:text-5xl"
                initial={{ opacity: 0, scale: 0, y: 100 }}
                animate={{
                  opacity: [0, 0.8, 0.8, 0],
                  scale: [0, 1.2, 1, 0.8],
                  y: [100, -20 + (i % 3) * 30, -40 + (i % 2) * 20, -80],
                  x: [(i - 2.5) * 80, (i - 2.5) * 100],
                  rotate: [0, (i % 2 === 0 ? 1 : -1) * 15],
                }}
                transition={{ duration: 2.5, delay: i * 0.15, ease: 'easeOut' }}
              >
                {emoji}
              </motion.div>
            ))}
          </>
        )}

        {/* Logo placeholder */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {phase >= 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center mb-6 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(280, 52%, 49%), hsl(340, 60%, 84%))',
                boxShadow: '0 0 80px hsla(280, 52%, 49%, 0.5), 0 0 120px hsla(340, 60%, 84%, 0.3)',
              }}
            >
              {/* Logo image placeholder - replace src with your logo */}
              <img
                src="/images/logo.png"
                alt="Welcome Dry Fruit House Logo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-5xl md:text-6xl">🌰</span>';
                }}
              />
            </motion.div>
          )}

          {phase >= 2 && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-display font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, hsl(280, 52%, 70%), hsl(340, 60%, 84%), hsl(280, 52%, 70%))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome
            </motion.h1>
          )}

          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl font-display tracking-widest uppercase"
              style={{ color: 'hsl(340, 60%, 84%)' }}
            >
              Dry Fruit House
            </motion.p>
          )}

          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8 }}
              className="mt-4 text-sm tracking-[0.3em] uppercase"
              style={{ color: 'hsl(280, 52%, 70%)' }}
            >
              Premium Quality · Since Day One
            </motion.p>
          )}

          {/* Loading bar */}
          {phase >= 1 && (
            <motion.div
              className="mt-8 w-48 h-1 rounded-full overflow-hidden"
              style={{ background: 'hsla(280, 52%, 49%, 0.2)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(280, 52%, 49%), hsl(340, 60%, 84%))' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.8, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
