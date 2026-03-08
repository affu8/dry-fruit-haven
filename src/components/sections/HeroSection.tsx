import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import DryFruitScene from '../three/DryFruitScene';
import { Button } from '../ui/button';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary/30" />
      
      {/* Colorful orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/15 blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-golden-almond/15 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-secondary/30 blur-3xl" />
      
      {/* 3D Scene - pushed behind content */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Suspense fallback={null}>
          <DryFruitScene />
        </Suspense>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full liquid-glass"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">Premium Quality Since Day One</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Premium Dry Fruits</span>
            <br />
            <span className="text-foreground">for a Healthy Lifestyle</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Nature's finest in every handpicked pack. From our family to yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/products')}
              className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-accent to-primary text-accent-foreground hover:opacity-90 transition-opacity shadow-lg"
            >
              Explore Products
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection('#contact')}
              className="text-lg px-8 py-6 rounded-full border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all"
            >
              Order Now
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} className="text-accent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
