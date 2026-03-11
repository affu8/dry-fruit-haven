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
        style={{ background: 'linear-gradient(135deg, hsl(30, 30%, 95%) 0%, hsl(335, 70%, 92%) 30%, hsl(216, 26%, 85%) 60%, hsl(30, 33%, 90%) 100%)' }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated orbs - positioned absolutely centered */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(335, 87%, 71%, 0.1), transparent)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(216, 26%, 55%, 0.12), transparent)', top: '40%', left: '55%', transform: 'translate(-50%, -50%)' }}
          animate={{ scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Main Content - flex column centered */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md mx-auto">
          {/* Logo + Person Image */}
          {phase >= 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative mb-6"
            >
              <div
                className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto"
                style={{
                  border: '3px solid hsl(335, 87%, 71%)',
                  boxShadow: '0 0 40px hsla(335, 87%, 71%, 0.2)',
                }}
              >
                <img
                  src="/images/owner-profile-3.jpg"
                  alt="Welcome Dry Fruit House - Founder"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          )}

          {/* Brand Name - vibrant and premium */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-2"
            >
              <h1
                className="text-3xl md:text-5xl font-display font-bold leading-tight"
                style={{
                  background: 'linear-gradient(135deg, hsl(38, 60%, 55%), hsl(335, 87%, 65%), hsl(216, 26%, 50%))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome
              </h1>
              <p
                className="text-lg md:text-xl font-display tracking-[0.25em] uppercase mt-1"
                style={{ color: 'hsl(200, 18%, 25%)' }}
              >
                Dry Fruit House
              </p>
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 0.8 }}
              className="mt-2 text-xs tracking-[0.3em] uppercase"
              style={{ color: 'hsl(335, 50%, 50%)' }}
            >
              Premium Quality · Since Day One
            </motion.p>
          )}

          {/* Loading bar */}
          {phase >= 1 && (
            <motion.div
              className="mt-8 w-40 h-1 rounded-full overflow-hidden"
              style={{ background: 'hsla(200, 18%, 17%, 0.08)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(335, 87%, 71%), hsl(216, 26%, 55%), hsl(38, 60%, 65%))' }}
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
