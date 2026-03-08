import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from '../components/SplashScreen';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import BrandIntroSection from '../components/sections/BrandIntroSection';
import OwnerStorySection from '../components/sections/OwnerStorySection';
import ProductsSection from '../components/sections/ProductsSection';
import HealthBenefitsSection from '../components/sections/HealthBenefitsSection';
import GiftHampersSection from '../components/sections/GiftHampersSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
      
      {!showSplash && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-background text-foreground overflow-x-hidden"
        >
          <Navbar />
          <main>
            <HeroSection />
            <div id="about">
              <BrandIntroSection />
            </div>
            <div id="story">
              <OwnerStorySection />
            </div>
            <div id="products">
              <ProductsSection />
            </div>
            <HealthBenefitsSection />
            <GiftHampersSection />
            <TestimonialsSection />
            <div id="contact">
              <ContactSection />
            </div>
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
};

export default Index;
