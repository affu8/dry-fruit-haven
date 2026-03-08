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
        style={{ background: 'linear-gradient(135deg, hsl(30, 30%, 95%) 0%, hsl(216, 26%, 85%) 50%, hsl(30, 33%, 90%) 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated background orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(216, 26%, 55%, 0.15), transparent)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(30, 33%, 85%, 0.3), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], x: [50, -50, 50], y: [-30, 30, -30] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Decorative floating elements - leaf/botanical shapes */}
        {phase >= 1 && (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0, scale: 0, y: 100 }}
                animate={{
                  opacity: [0, 0.6, 0.6, 0],
                  scale: [0, 1, 0.9, 0.7],
                  y: [100, -20 + (i % 3) * 30, -40, -100],
                  x: [(i - 2.5) * 80, (i - 2.5) * 110],
                  rotate: [0, (i % 2 === 0 ? 1 : -1) * 20],
                }}
                transition={{ duration: 2.5, delay: i * 0.15, ease: 'easeOut' }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(216, 26%, 55%)" strokeWidth="1.5" opacity={0.5}>
                  {i % 3 === 0 && <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5-3 2-7 2-10S13.5 2 12 2z" />}
                  {i % 3 === 1 && <path d="M7 21c0-4 2-8 5-10s5-6 5-10c-3 2-5 5-7 8S7 17 7 21z" />}
                  {i % 3 === 2 && <circle cx="12" cy="12" r="8" />}
                </svg>
              </motion.div>
            ))}
          </>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Person Image + Logo */}
          {phase >= 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative mb-8"
            >
              {/* Person image circle */}
              <div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden"
                style={{
                  border: '4px solid hsl(216, 26%, 55%)',
                  boxShadow: '0 0 60px hsla(216, 26%, 55%, 0.2), 0 0 100px hsla(30, 33%, 85%, 0.3)',
                }}
              >
                <img
                  src="/images/owner-profile.jpg"
                  alt="Welcome Dry Fruit House - Founder"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.style.background = 'linear-gradient(135deg, hsl(216, 26%, 55%), hsl(30, 33%, 85%))';
                    target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg></div>';
                  }}
                />
              </div>
              {/* Logo overlay */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-3 -right-3 w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, hsl(216, 26%, 55%), hsl(30, 33%, 85%))',
                  border: '3px solid hsl(30, 30%, 97%)',
                  boxShadow: '0 4px 20px hsla(216, 26%, 55%, 0.3)',
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>';
                  }}
                />
              </motion.div>
            </motion.div>
          )}

          {phase >= 2 && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-display font-bold mb-3"
              style={{
                background: 'linear-gradient(135deg, hsl(216, 26%, 40%), hsl(216, 26%, 55%), hsl(30, 33%, 70%))',
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
              style={{ color: 'hsl(216, 26%, 45%)' }}
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
              style={{ color: 'hsl(220, 20%, 40%)' }}
            >
              Premium Quality · Since Day One
            </motion.p>
          )}

          {/* Loading bar */}
          {phase >= 1 && (
            <motion.div
              className="mt-8 w-48 h-1 rounded-full overflow-hidden"
              style={{ background: 'hsla(216, 26%, 55%, 0.15)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(216, 26%, 55%), hsl(30, 33%, 85%))' }}
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
