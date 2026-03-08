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
        {/* Animated orbs */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(335, 87%, 71%, 0.12), transparent)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3], x: [-50, 50, -50] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(216, 26%, 55%, 0.15), transparent)' }}
          animate={{ scale: [1.2, 1, 1.2], x: [60, -60, 60], y: [-40, 40, -40] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(30, 33%, 85%, 0.25), transparent)' }}
          animate={{ scale: [0.8, 1.2, 0.8], y: [30, -50, 30] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />

        {/* Decorative shapes */}
        {phase >= 1 && (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 8 + (i % 3) * 6,
                  height: 8 + (i % 3) * 6,
                  background: i % 2 === 0
                    ? 'hsl(335, 87%, 71%)'
                    : i % 3 === 0 ? 'hsl(216, 26%, 55%)' : 'hsl(30, 33%, 75%)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.7, 0.5, 0],
                  scale: [0, 1.5, 1, 0.5],
                  y: [80, -30 + (i % 4) * 20, -80, -150],
                  x: [(i - 3.5) * 70, (i - 3.5) * 100],
                }}
                transition={{ duration: 2.5, delay: i * 0.1, ease: 'easeOut' }}
              />
            ))}
          </>
        )}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          {/* Person Image + Logo */}
          {phase >= 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative mb-8"
            >
              <div
                className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden"
                style={{
                  border: '4px solid hsl(335, 87%, 71%)',
                  boxShadow: '0 0 60px hsla(335, 87%, 71%, 0.25), 0 0 100px hsla(216, 26%, 55%, 0.15)',
                }}
              >
                <img
                  src="/images/owner-profile.jpg"
                  alt="Welcome Dry Fruit House - Founder"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.style.background = 'linear-gradient(135deg, hsl(335, 87%, 71%), hsl(216, 26%, 55%))';
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
                  background: 'linear-gradient(135deg, hsl(335, 87%, 71%), hsl(216, 26%, 55%))',
                  border: '3px solid hsl(30, 30%, 97%)',
                  boxShadow: '0 4px 20px hsla(335, 87%, 71%, 0.3)',
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
                background: 'linear-gradient(135deg, hsl(200, 18%, 17%), hsl(335, 87%, 71%), hsl(216, 26%, 55%))',
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
              style={{ color: 'hsl(200, 18%, 25%)' }}
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
              style={{ color: 'hsl(335, 50%, 50%)' }}
            >
              Premium Quality · Since Day One
            </motion.p>
          )}

          {/* Loading bar */}
          {phase >= 1 && (
            <motion.div
              className="mt-8 w-48 h-1.5 rounded-full overflow-hidden"
              style={{ background: 'hsla(200, 18%, 17%, 0.08)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(335, 87%, 71%), hsl(216, 26%, 55%), hsl(30, 33%, 85%))' }}
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
