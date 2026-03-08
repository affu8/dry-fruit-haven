import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const followerX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const followerY = useSpring(cursorY, { damping: 30, stiffness: 150 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, [role="button"], input, textarea, select, label')) {
        setIsHovering(true);
      }
    };

    const handleOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleOver);
    window.addEventListener('mouseout', handleOut);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mouseout', handleOut);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Ring cursor */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-normal"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 28,
            height: isHovering ? 48 : 28,
            borderColor: isHovering ? 'hsl(335, 87%, 71%)' : 'hsl(216, 26%, 55%)',
          }}
          transition={{ duration: 0.2 }}
          style={{
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      {/* Gradient follower */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 80 : 50,
            height: isHovering ? 80 : 50,
            opacity: isHovering ? 0.2 : 0.12,
          }}
          transition={{ duration: 0.3 }}
          style={{
            borderRadius: '50%',
            background: 'radial-gradient(circle, hsl(335, 87%, 71%), hsl(216, 26%, 55%))',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>
    </>
  );
}
